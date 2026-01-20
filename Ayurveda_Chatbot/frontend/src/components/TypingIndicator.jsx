import React from "react";

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-xs text-sand-500">
      <span className="h-2 w-2 animate-bounce rounded-full bg-sand-400" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-sand-400 [animation-delay:150ms]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-sand-400 [animation-delay:300ms]" />
      <span>Prakriti Guru is thinking...</span>
    </div>
  );
}
