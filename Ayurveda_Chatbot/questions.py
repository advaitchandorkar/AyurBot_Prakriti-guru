QUESTION_BANK = [
    {"id": "vata_1", "dosha": "vata", "text": "I often feel cold, especially in hands and feet."},
    {"id": "vata_2", "dosha": "vata", "text": "My digestion is irregular and sometimes bloated."},
    {"id": "vata_3", "dosha": "vata", "text": "My energy and mood fluctuate during the day."},
    {"id": "vata_4", "dosha": "vata", "text": "I have dry skin or dry hair."},
    {"id": "vata_5", "dosha": "vata", "text": "I tend to worry or feel anxious easily."},
    {"id": "vata_6", "dosha": "vata", "text": "My sleep is light and I wake up easily."},
    {"id": "vata_7", "dosha": "vata", "text": "I prefer warm, cooked foods over raw foods."},
    {"id": "vata_8", "dosha": "vata", "text": "I speak or move quickly."},
    {"id": "vata_9", "dosha": "vata", "text": "I get constipated or have dry stools."},
    {"id": "vata_10", "dosha": "vata", "text": "My appetite varies a lot from day to day."},
    {"id": "pitta_1", "dosha": "pitta", "text": "I feel warm or overheat easily."},
    {"id": "pitta_2", "dosha": "pitta", "text": "I have a strong appetite and dislike skipping meals."},
    {"id": "pitta_3", "dosha": "pitta", "text": "I am competitive or driven to achieve goals."},
    {"id": "pitta_4", "dosha": "pitta", "text": "I get irritated or frustrated quickly."},
    {"id": "pitta_5", "dosha": "pitta", "text": "I am sensitive to spicy or acidic foods."},
    {"id": "pitta_6", "dosha": "pitta", "text": "I tend to sweat a lot."},
    {"id": "pitta_7", "dosha": "pitta", "text": "My skin gets red, inflamed, or breaks out easily."},
    {"id": "pitta_8", "dosha": "pitta", "text": "I like clear plans and dislike delays."},
    {"id": "pitta_9", "dosha": "pitta", "text": "I experience heartburn or acidity."},
    {"id": "pitta_10", "dosha": "pitta", "text": "I prefer cool or room-temperature environments."},
    {"id": "kapha_1", "dosha": "kapha", "text": "I gain weight easily or have a slow metabolism."},
    {"id": "kapha_2", "dosha": "kapha", "text": "I feel steady, calm, and grounded."},
    {"id": "kapha_3", "dosha": "kapha", "text": "I have thick, oily, or moist skin/hair."},
    {"id": "kapha_4", "dosha": "kapha", "text": "I sleep deeply and can sleep for long hours."},
    {"id": "kapha_5", "dosha": "kapha", "text": "I feel sluggish in the morning or after meals."},
    {"id": "kapha_6", "dosha": "kapha", "text": "I prefer routine and dislike sudden changes."},
    {"id": "kapha_7", "dosha": "kapha", "text": "I tend to get congested or have excess mucus."},
    {"id": "kapha_8", "dosha": "kapha", "text": "I have steady energy and endurance."},
    {"id": "kapha_9", "dosha": "kapha", "text": "I eat for comfort or find it hard to skip snacks."},
    {"id": "kapha_10", "dosha": "kapha", "text": "I move and speak at a calm, slow pace."},
]


def score_quiz(answers):
    scores = {"vata": 0, "pitta": 0, "kapha": 0}
    answer_map = {a.get("id"): int(a.get("score", 0)) for a in answers}

    for question in QUESTION_BANK:
        qid = question["id"]
        dosha = question["dosha"]
        scores[dosha] += max(0, min(4, answer_map.get(qid, 0)))

    normalized = {k: round(v / 10, 2) for k, v in scores.items()}
    ranked = sorted(normalized.items(), key=lambda x: x[1], reverse=True)
    top, second, third = ranked[0], ranked[1], ranked[2]

    profile = "tridoshic"
    summary = "Balanced across Vata, Pitta, and Kapha."
    if abs(top[1] - second[1]) <= 0.15 and abs(top[1] - third[1]) <= 0.15:
        profile = "tridoshic"
        summary = "Balanced across Vata, Pitta, and Kapha."
    elif abs(top[1] - second[1]) <= 0.15:
        profile = f"{top[0]}-{second[0]}"
        summary = f"Mixed profile: {top[0].title()} + {second[0].title()}."
    else:
        profile = top[0]
        summary = f"Primary profile: {top[0].title()}."

    return {"scores": normalized, "profile": profile, "summary": summary}
