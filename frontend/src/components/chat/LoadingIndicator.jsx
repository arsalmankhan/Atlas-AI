import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="flex justify-start w-full">
      <div
        className="flex flex-col gap-2 max-w-[460px]
        px-4 py-3 bg-[var(--card)]
        border border-[var(--input-border)]
        rounded-2xl rounded-tl-sm shadow-sm"
      >
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-[var(--bg)] border border-[var(--input-border)] flex items-center justify-center">
            <span className="text-[10px] font-medium text-muted">AI</span>
          </div>

          <span className="text-[13px] text-muted">Generating a response…</span>
        </div>

        <div className="flex flex-col gap-1 mt-1">
          <div className="h-2.5 w-11/12 rounded-full bg-[var(--input-border)] animate-pulse" />
          <div className="h-2.5 w-4/5 rounded-full bg-[var(--input-border)] animate-pulse [animation-delay:0.12s]" />
        </div>

        <div className="mt-2 h-1.5 w-full rounded-full overflow-hidden bg-[var(--bg)]/60">
          <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-[var(--text)]/40 via-[var(--muted)] to-[var(--text)]/40 animate-[slide_1s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
