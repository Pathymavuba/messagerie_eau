const Message = require("../model/message");
const express = require("express");
const router = express.Router();

router.post("/message", async (req, res) => {
  try {
    const message = await Message.create({
      text: req.body.text,
      image: req.body.image,
      fichier: req.body.fichier,
      sender: req.body.sender,
      receiver: req.body.receiver,
      conversation: req.body.conversation,
    });
    return res.status(201).json({ msg: "msg sended", data: message });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/message/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversation: req.body.conversationId,
    }).populate({ path: "conversation" });
    return res.status(201).json({ msg: "messaged", data: messages });
  } catch (error) {
    return res.status(500).send(error);
  }
});
module.exports = router;
