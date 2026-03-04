import React, { useRef, useEffect } from "react";
import ChatMessageItem from "./ChatMessageItem.jsx";
import LoadingIndicator from "./LoadingIndicator.jsx";

const ChatMessages = ({ messages, isSending }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 text-center">
        <div className="flex flex-col items-center gap-4 max-w-lg">
          <div className="bg-[var(--card)] border border-[var(--input-border)] text-muted text-xs px-4 py-1 rounded-full">
            Preview
          </div>

          <div className="flex items-center gap-3">
            <img src="/favicon.svg" alt="Atlas AI" className="w-10 h-10" />

            <h1 className="text-4xl font-semibold bg-gradient-to-r from-[var(--text)] to-[var(--muted)] bg-clip-text text-transparent">
              Atlas AI
            </h1>
          </div>

          <p className="text-sm text-muted leading-relaxed">
            Chat with your personal AI assistant to get help with coding,
            learning new concepts, brainstorming ideas, or managing everyday
            tasks. All your conversations stay saved in the sidebar so you can
            continue anytime.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pt-4 md:pt-8 pb-4 scrollbar-hide">
      <div className="flex flex-col max-w-[820px] mx-auto px-4 gap-4">
        {messages.map((msg, index) => (
          <ChatMessageItem key={index} message={msg} />
        ))}

        {isSending && <LoadingIndicator />}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
