const chatModel = require("../models/chat.model");
const messageModel = require("../models/message.model");

async function createChat(req, res) {
  const { title } = req.body;
  const user = req.user;

  const chat = await chatModel.create({
    user: user._id,
    title,
  });

  res.status(201).json({
    chat,
  });
}

async function getChats(req, res) {
  const user = req.user;

  const chats = await chatModel
    .find({ user: user._id })
    .sort({ updatedAt: -1 });

  res.json({ chats });
}

async function getMessages(req, res) {
  const chatId = req.params.id;

  const messages = await messageModel
    .find({ chat: chatId })
    .sort({ createdAt: 1 });

  res.json({ messages });
}

async function renameChat(req, res) {
  const { id } = req.params;
  const { title } = req.body;

  const chat = await chatModel.findByIdAndUpdate(id, { title }, { new: true });

  res.json({ chat });
}

async function deleteChat(req, res) {
  const { id } = req.params;

  await chatModel.findByIdAndDelete(id);
  await messageModel.deleteMany({ chat: id });

  res.json({ success: true });
}

module.exports = {
  createChat,
  getChats,
  getMessages,
  renameChat,
  deleteChat,
};
