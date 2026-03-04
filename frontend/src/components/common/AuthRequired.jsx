import React from "react";
import { Link } from "react-router-dom";

const AuthRequired = () => {
  return (
    <div className="flex items-center justify-center h-screen app-root px-4 animate-fadeIn">
      <div className="card backdrop-blur-xl rounded-2xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full card flex items-center justify-center text-lg font-semibold">
            🔒
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-3">Login Required</h2>
        <p className="text-muted text-sm leading-relaxed mb-6">
          You must be signed in to access this page. Please log in to continue.
        </p>
        <Link
          to="/login"
          className="
             btn-primary block w-full text-center px-4 py-2 
             font-medium rounded-lg
             hover:opacity-90 transition 
          "
        >
          Go to Login →
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <div className="h-px bg-[var(--input-border)] flex-1"></div>
          <span className="text-xs text-muted uppercase tracking-wide">OR</span>
          <div className="h-px bg-[var(--input-border)] flex-1"></div>
        </div>
        <p className="mt-4 text-center text-[12px] text-muted">
          No account yet?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthRequired;
