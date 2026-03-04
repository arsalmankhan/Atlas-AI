import React from "react";
import { Copy, RefreshCw } from "lucide-react";

const ChatMessageItem = ({ message }) => {
  const isUser = message.type === "user";

  return (
    <div
      className={`
        flex w-full
        ${isUser ? "justify-end" : "justify-start"}
      `}
    >
      <div
        className={`
          flex flex-col gap-2 p-3 max-w-[80%] rounded-xl shadow-md transition-colors duration-200
          
          ${
            isUser
              ? "bg-[var(--primary)] text-[var(--primary-contrast)] rounded-br-none"
              : "bg-[var(--card)] text-[var(--text)] rounded-tl-none border border-[var(--input-border)]"
          }
        `}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>

        {!isUser && (
          <div className="flex justify-end gap-2 mt-1">
            <button
              aria-label="Copy message"
              className="w-6 h-6 flex items-center justify-center rounded-full text-muted hover:bg-[var(--input-border)] transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button
              aria-label="Regenerate response"
              className="w-6 h-6 flex items-center justify-center rounded-full text-muted hover:bg-[var(--input-border)] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessageItem;
