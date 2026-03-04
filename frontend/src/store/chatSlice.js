import { createSlice, nanoid } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",

  initialState: {
    chats: [],
    activeChatId: null,
    isSending: false,
    input: "",
  },

  reducers: {
    setChats(state, action) {
      state.chats = action.payload.map((c) => ({
        ...c,
        id: c._id || nanoid(),
      }));
    },

    startNewChat(state, action) {
      const { _id, title } = action.payload;

      const chat = {
        _id,
        id: _id,
        title,
        messages: [],
      };

      state.chats.unshift(chat);
      state.activeChatId = chat.id;
    },

    selectChat(state, action) {
      state.activeChatId = action.payload;
    },

    setInput(state, action) {
      state.input = action.payload;
    },

    sendingStarted(state) {
      state.isSending = true;
    },

    sendingFinished(state) {
      state.isSending = false;
    },

    renameChat(state, action) {
      const { id, title } = action.payload;

      const chat = state.chats.find((c) => c.id === id || c._id === id);
      if (chat) chat.title = title;
    },

    deleteChat(state, action) {
      const id = action.payload;

      state.chats = state.chats.filter((c) => c.id !== id && c._id !== id);

      if (state.activeChatId === id) {
        state.activeChatId = state.chats[0]?.id || null;
      }
    },
  },
});

export const {
  setChats,
  startNewChat,
  selectChat,
  setInput,
  sendingStarted,
  sendingFinished,
  renameChat,
  deleteChat,
} = chatSlice.actions;

export default chatSlice.reducer;
