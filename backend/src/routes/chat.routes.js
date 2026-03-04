const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const chatController = require("../controllers/chat.controller");

const router = express.Router();

router.post("/", authMiddleware.authUser, chatController.createChat);
router.get("/", authMiddleware.authUser, chatController.getChats);
router.get(
  "/messages/:id",
  authMiddleware.authUser,
  chatController.getMessages,
);

router.patch("/:id", authMiddleware.authUser, chatController.renameChat);
router.delete("/:id", authMiddleware.authUser, chatController.deleteChat);

module.exports = router;
