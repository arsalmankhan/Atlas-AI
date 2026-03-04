import React, { useRef, useEffect } from "react";
import { Send, Image } from "lucide-react";

const ChatComposer = ({ input, setInput, onSend, isSending }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  return (
    <div className="flex justify-center w-full px-4 pt-2 pb-6 md:pb-8">
      <div
        className={`flex w-full max-w-[820px] items-center rounded-2xl p-2.5 
          bg-[var(--card)] border border-[var(--input-border)] 
          transition-shadow duration-200
          ${
            input.length > 0
              ? "shadow-[0_0_0_3px_rgba(var(--primary-rgb),0.1)]"
              : ""
          } 
          focus-within:shadow-[0_0_0_3px_rgba(var(--primary-rgb),0.12)]`}
      >
        <button
          type="button"
          aria-label="Attach file"
          className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors duration-150 text-muted hover:bg-[var(--input-bg)]"
        >
          <Image className="w-5 h-5" />
        </button>

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          rows={1}
          placeholder="Ask anything..."
          className="flex-1 max-h-[200px] mx-2 resize-none appearance-none outline-none 
            bg-transparent text-[var(--text)] placeholder:text-muted overflow-y-auto scrollbar-hide
            pt-2 pb-2 leading-relaxed"
          disabled={isSending}
          spellCheck="false"
        />

        <button
          type="submit"
          aria-label="Send message"
          onClick={onSend}
          disabled={!input.trim() || isSending}
          className={`w-9 h-9 flex items-center justify-center rounded-xl transition-colors duration-150 
            ${
              input.trim()
                ? "btn-primary hover:opacity-90"
                : "bg-muted text-[var(--text)]/50 cursor-not-allowed opacity-60"
            }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatComposer;
