import os
import uuid
from datetime import datetime
from flask import Flask, jsonify, request, send_from_directory
from flask_pymongo import PyMongo
import google.generativeai as genai
from dotenv import load_dotenv
from questions import QUESTION_BANK, score_quiz


load_dotenv()

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
MONGODB_URI = os.environ.get("MONGODB_URI")

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is not set")
if not MONGODB_URI:
    raise RuntimeError("MONGODB_URI is not set")

genai.configure(api_key=GEMINI_API_KEY)

app = Flask(__name__, static_folder="static/app", static_url_path="/")
app.config["MONGO_URI"] = MONGODB_URI
mongo = PyMongo(app)


SYSTEM_INSTRUCTION = (
    "You are Prakriti Guru, an Ayurveda-focused assistant. "
    "Scope: Ayurveda lifestyle, diet, daily routine, sleep, stress, and general wellness education. "
    "Do not diagnose diseases, prescribe treatments, or claim cures. "
    "If the user reports severe symptoms, advise consulting a qualified clinician. "
    "Always be concise, structured, and ask 1-2 clarifying questions. "
    "Use the output format exactly:\n"
    "Summary:\n"
    "Recommendations:\n"
    "Follow-up questions:"
)


def _now():
    return datetime.utcnow()


def _get_session_id():
    session_id = request.cookies.get("session_id")
    if not session_id:
        session_id = str(uuid.uuid4())
    return session_id


def _set_session_cookie(response, session_id):
    response.set_cookie("session_id", session_id, httponly=True, samesite="Lax")
    return response


def _get_quiz_context(session_id):
    result = mongo.db.quiz_results.find_one(
        {"session_id": session_id},
        sort=[("updated_at", -1)],
    )
    if not result:
        return ""
    summary = result.get("result", "")
    return f"User's latest dosha assessment: {summary}"


def _serialize(doc):
    if not doc:
        return doc
    serialized = {}
    for key, value in doc.items():
        if isinstance(value, datetime):
            serialized[key] = value.isoformat()
        else:
            serialized[key] = value
    return serialized


def _generate_response(user_text, quiz_context):
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        system_instruction=SYSTEM_INSTRUCTION,
    )
    prompt = user_text
    if quiz_context:
        prompt = f"{quiz_context}\n\nUser question: {user_text}"
    response = model.generate_content(prompt)
    return response.text


@app.route("/api/questions", methods=["GET"])
def list_questions():
    return jsonify({"questions": QUESTION_BANK})


@app.route("/api/conversations", methods=["GET", "POST"])
def conversations():
    session_id = _get_session_id()
    if request.method == "POST":
        payload = request.get_json(silent=True) or {}
        title = payload.get("title") or "New Conversation"
        convo_id = str(uuid.uuid4())
        doc = {
            "session_id": session_id,
            "convo_id": convo_id,
            "title": title[:80],
            "created_at": _now(),
            "updated_at": _now(),
        }
        mongo.db.conversations.insert_one(doc)
        response = jsonify({"conversation": {"convo_id": convo_id, "title": doc["title"]}})
        return _set_session_cookie(response, session_id)

    convos = list(
        mongo.db.conversations.find(
            {"session_id": session_id},
            {"_id": 0},
        ).sort("updated_at", -1)
    )
    response = jsonify({"conversations": [_serialize(convo) for convo in convos]})
    return _set_session_cookie(response, session_id)


@app.route("/api/conversations/<convo_id>/messages", methods=["GET"])
def conversation_messages(convo_id):
    session_id = _get_session_id()
    convo = mongo.db.conversations.find_one({"session_id": session_id, "convo_id": convo_id})
    if not convo:
        response = jsonify({"error": "Conversation not found"})
        response.status_code = 404
        return _set_session_cookie(response, session_id)

    messages = list(
        mongo.db.messages.find({"convo_id": convo_id}, {"_id": 0}).sort("created_at", 1)
    )
    response = jsonify({"messages": [_serialize(msg) for msg in messages]})
    return _set_session_cookie(response, session_id)


@app.route("/api/chat", methods=["POST"])
def chat():
    session_id = _get_session_id()
    payload = request.get_json(silent=True) or {}
    text = (payload.get("text") or "").strip()
    convo_id = payload.get("convo_id")

    if not text:
        response = jsonify({"error": "Text is required"})
        response.status_code = 400
        return _set_session_cookie(response, session_id)

    if not convo_id:
        convo_id = str(uuid.uuid4())
        title = text[:60] or "New Conversation"
        mongo.db.conversations.insert_one(
            {
                "session_id": session_id,
                "convo_id": convo_id,
                "title": title,
                "created_at": _now(),
                "updated_at": _now(),
            }
        )

    mongo.db.messages.insert_one(
        {
            "convo_id": convo_id,
            "role": "user",
            "content": text,
            "created_at": _now(),
        }
    )

    try:
        quiz_context = _get_quiz_context(session_id)
        assistant_text = _generate_response(text, quiz_context)
    except Exception as exc:
        response = jsonify({"error": f"Model error: {exc}"})
        response.status_code = 500
        return _set_session_cookie(response, session_id)

    mongo.db.messages.insert_one(
        {
            "convo_id": convo_id,
            "role": "assistant",
            "content": assistant_text,
            "created_at": _now(),
        }
    )
    mongo.db.conversations.update_one(
        {"convo_id": convo_id},
        {"$set": {"updated_at": _now()}},
    )

    response = jsonify({"convo_id": convo_id, "reply": assistant_text})
    return _set_session_cookie(response, session_id)


@app.route("/api/quiz", methods=["GET", "POST"])
def quiz():
    session_id = _get_session_id()
    if request.method == "POST":
        payload = request.get_json(silent=True) or {}
        answers = payload.get("answers") or []
        if not answers:
            response = jsonify({"error": "Answers are required"})
            response.status_code = 400
            return _set_session_cookie(response, session_id)

        result = score_quiz(answers)
        doc = {
            "session_id": session_id,
            "result": result["summary"],
            "scores": result["scores"],
            "profile": result["profile"],
            "created_at": _now(),
            "updated_at": _now(),
        }
        mongo.db.quiz_results.insert_one(doc)
        response = jsonify({"result": result})
        return _set_session_cookie(response, session_id)

    latest = mongo.db.quiz_results.find_one(
        {"session_id": session_id},
        {"_id": 0},
        sort=[("updated_at", -1)],
    )
    response = jsonify({"result": _serialize(latest)})
    return _set_session_cookie(response, session_id)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_spa(path):
    if path.startswith("api"):
        response = jsonify({"error": "Not found"})
        response.status_code = 404
        return response
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5001"))
    app.run(debug=False, port=port)
