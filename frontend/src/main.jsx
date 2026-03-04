import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import axios from "axios";
import store from "./store/store.js";
import { setUser } from "./store/authSlice.js";
import App from "./App.jsx";
import "./index.css";

function initSystemTheme() {
  try {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (isDark) => {
      document.documentElement.classList.toggle("dark", isDark);
    };

    applyTheme(mediaQuery.matches);

    const listener = (e) => applyTheme(e.matches);
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", listener);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(listener);
    }
  } catch {
    document.documentElement.classList.add("dark");
  }
}

initSystemTheme();

async function initAuth() {
  try {
    const res = await axios.get("http://localhost:3000/api/auth/me", {
      withCredentials: true,
    });
    store.dispatch(setUser(res.data.user));
  } catch {
    store.dispatch(setUser(null));
  }
}

initAuth();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
