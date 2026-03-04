import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import ChatMobileBar from "../components/chat/ChatMobileBar.jsx";
import ChatSidebar from "../components/chat/ChatSidebar.jsx";
import ChatMessages from "../components/chat/ChatMessages.jsx";
import ChatComposer from "../components/chat/ChatComposer.jsx";
import NewChatModal from "../components/chat/NewChatModal.jsx";
import AuthRequired from "../components/common/AuthRequired.jsx";

import {
  startNewChat,
  selectChat,
  setInput,
  sendingStarted,
  sendingFinished,
  setChats,
  renameChat,
  deleteChat,
} from "../store/chatSlice.js";

const Home = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  const chats = useSelector((state) => state.chat.chats);
  const activeChatId = useSelector((state) => state.chat.activeChatId);
  const input = useSelector((state) => state.chat.input);
  const isSending = useSelector((state) => state.chat.isSending);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user) return <AuthRequired />;

  const createNewChat = async (title) => {
    if (!title) return;

    try {
      const res = await axios.post(
        "http://localhost:3000/api/chat",
        { title },
        { withCredentials: true },
      );

      dispatch(startNewChat(res.data.chat));
      getMessages(res.data.chat._id);
      setSidebarOpen(false);
    } catch (err) {
      console.error("Create chat failed", err);
    }
  };

  const handleRenameChat = async (id, title) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/chat/${id}`,
        { title },
        { withCredentials: true },
      );

      dispatch(renameChat({ id, title }));
    } catch (err) {
      console.error("Rename failed", err);
    }
  };

  const handleDeleteChat = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/chat/${id}`, {
        withCredentials: true,
      });

      dispatch(deleteChat(id));
      setMessages([]);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || !activeChatId || isSending) return;

    dispatch(sendingStarted());

    setMessages((prev) => [...prev, { type: "user", content: trimmed }]);
    dispatch(setInput(""));

    socket.emit("ai-message", {
      chat: activeChatId,
      content: trimmed,
    });
  };

  const getMessages = async (chatId) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/chat/messages/${chatId}`,
        { withCredentials: true },
      );

      setMessages(
        res.data.messages.map((m) => ({
          type: m.role === "user" ? "user" : "ai",
          content: m.content,
        })),
      );
    } catch (err) {
      console.error("Load messages error", err);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/chat", { withCredentials: true })
      .then((res) => dispatch(setChats(res.data.chats.reverse())))
      .catch(console.error);

    const s = io("http://localhost:3000", { withCredentials: true });

    s.on("ai-response", (payload) => {
      setMessages((prev) => [
        ...prev,
        { type: "ai", content: payload.content },
      ]);

      dispatch(sendingFinished());
    });

    setSocket(s);
    return () => s.disconnect();
  }, [dispatch]);

  return (
    <div className="app-root flex h-[100dvh]">
      <ChatMobileBar
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
        onNewChat={() => setIsModalOpen(true)}
      />

      <ChatSidebar
        chats={chats}
        activeChatId={activeChatId}
        open={sidebarOpen}
        onNewChat={() => setIsModalOpen(true)}
        onToggleSidebar={() => setSidebarOpen(false)}
        onSelectChat={(id) => {
          dispatch(selectChat(id));
          dispatch(setInput(""));
          getMessages(id);
          setSidebarOpen(false);
        }}
        onRenameChat={handleRenameChat}
        onDeleteChat={handleDeleteChat}
      />

      <main className="flex flex-col flex-1 pt-[52px] md:pt-0 overflow-hidden">
        {!activeChatId && (
          <div className="flex justify-center px-4 pt-6">
            <div
              className="w-full max-w-[720px] rounded-xl px-4 py-2 text-center text-sm
              bg-[var(--card)] border border-[var(--input-border)] text-muted"
            >
              Please select or start a new chat to begin.
            </div>
          </div>
        )}

        <ChatMessages messages={messages} isSending={isSending} />

        {activeChatId && (
          <ChatComposer
            input={input}
            setInput={(v) => dispatch(setInput(v))}
            onSend={sendMessage}
            isSending={isSending}
          />
        )}
      </main>

      <NewChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={createNewChat}
      />
    </div>
  );
};

export default Home;
