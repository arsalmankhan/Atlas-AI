import React, { useState } from "react";
import { X } from "lucide-react";

const NewChatModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");

  if (!isOpen) return null;

  const handleCreate = () => {
    if (title.trim()) {
      onSubmit(title.trim());
    }
    setTitle("");
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCreate();
    }
  };

  return (
    <div className="fixed inset-0 bg-[var(--bg)]/70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="card w-full max-w-sm p-6 relative">
        <div className="flex justify-between items-start border-b border-[var(--input-border)] pb-3 mb-4">
          <h2 className="text-xl font-semibold">Start a New Chat</h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-[var(--text)] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-muted mb-3">
          Please enter a title for your new conversation.
        </p>

        <input
          type="text"
          placeholder="e.g., Brainstorming marketing ideas"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input w-full px-4 py-2 mb-4"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-[var(--input-border)] bg-[var(--input-bg)] text-muted hover:bg-[var(--bg)]"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!title.trim()}
            className="btn-primary px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewChatModal;
