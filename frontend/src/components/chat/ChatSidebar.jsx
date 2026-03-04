import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { LogOut, MoreVertical } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const ChatSidebar = ({
  chats = [],
  activeChatId,
  onSelectChat,
  onNewChat,
  onToggleSidebar,
  open,
  onRenameChat,
  onDeleteChat,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpenId, setMenuOpenId] = useState(null);
  const [renameModal, setRenameModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const menuRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpenId(null);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://atlas-ai-tiku.onrender.com/api/auth/logout",
        {},
        { withCredentials: true },
      );

      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      {open && (
        <button
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={onToggleSidebar}
        />
      )}

      <aside
        className={`fixed md:static top-0 bottom-0 left-0 z-40 flex flex-col w-[250px]
        bg-[var(--card)] border-r border-[var(--input-border)]
        transform transition-transform duration-200
        ${open ? "translate-x-0" : "-translate-x-[270px]"}
        md:translate-x-0 md:pt-0 pt-[52px]`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--input-border)]">
          <h2 className="text-base font-medium">Chats</h2>

          <button
            className="px-3 py-1.5 text-[0.75rem] font-semibold uppercase rounded-md border border-[var(--input-border)] hover:bg-[var(--bg)]"
            onClick={onNewChat}
          >
            New
          </button>
        </div>

        <nav className="flex flex-col gap-2 p-3 overflow-y-auto flex-1">
          {chats.map((c) => {
            const id = c._id || c.id;
            const active = id === activeChatId;

            return (
              <div
                key={id}
                className={`relative px-4 py-3 rounded-xl cursor-pointer transition
                ${
                  active
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--input-bg)] border border-[var(--input-border)]"
                }`}
                onClick={() => onSelectChat(id)}
              >
                <div className="text-sm font-medium pr-8">
                  {c.title || "Untitled Chat"}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpenId(menuOpenId === id ? null : id);
                  }}
                  className="absolute right-2 top-2 p-1 hover:bg-black/10 rounded"
                >
                  <MoreVertical size={16} />
                </button>

                {menuOpenId === id && (
                  <div
                    ref={menuRef}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-2 top-9 w-32 rounded-lg border border-[var(--input-border)]
                    bg-[var(--card)] shadow-lg z-50 overflow-hidden"
                  >
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--bg)]"
                      onClick={() => {
                        setRenameModal(id);
                        setNewTitle(c.title);
                        setMenuOpenId(null);
                      }}
                    >
                      Rename
                    </button>

                    <button
                      className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                      onClick={() => {
                        setDeleteModal(id);
                        setMenuOpenId(null);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[var(--input-border)]">
          <button
            className="flex items-center justify-center w-full px-3 py-2 text-sm font-semibold rounded-lg 
              bg-red-600 text-white hover:bg-red-700 gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </aside>

      {renameModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-[90%] max-w-md rounded-2xl bg-[var(--card)] border border-[var(--input-border)] shadow-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Rename Chat</h2>

            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="input w-full mb-5"
              placeholder="Enter new title"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setRenameModal(null)}
                className="px-4 py-2 rounded-lg border border-[var(--input-border)]"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onRenameChat(renameModal, newTitle);
                  setRenameModal(null);
                }}
                className="btn-primary px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-[90%] max-w-md rounded-2xl bg-[var(--card)] border border-[var(--input-border)] shadow-xl p-6">
            <h2 className="text-lg font-semibold mb-3">Delete this chat?</h2>

            <p className="text-sm text-muted mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModal(null)}
                className="px-4 py-2 rounded-lg border border-[var(--input-border)]"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onDeleteChat(deleteModal);
                  setDeleteModal(null);
                }}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatSidebar;
