const Message = require("../model/message");
const express = require("express");
const router = express.Router();
const upload = require("../helpers/multer");
const path = require("path");
const cloudinary = require("../helpers/cloudinay");
const auth = require("../middleware/auth")

/**
 * Handles the POST request for sending a message with an image and a document.
 *
 * @param {Object} req - The request object containing the files, body, and other properties.
 * @param {Object} res - The response object to send back the response.
 *
 * @returns {Object} - Returns a JSON response with a success message and the created message data.
 *                      If an error occurs, returns a JSON response with an error status.
 */
router.post("/message",auth, upload.array("file", 12), async (req, res) => {
  let image, doc;
  req.files.map((el) => {
    if (
      path.extname(el.originalname) === ".jpg" ||
      (path.extname(el.originalname) === ".jpeg" &&
        path.extname(el.originalname) === ".png")
    ) {
      image = el;
    } else if (
      path.extname(el.originalname) === ".docx" ||
      path.extname(el.originalname) === ".doc" ||
      path.extname(el.originalname) === ".pdf"
    ) {
      doc = el;
    }
  });
  try {
    //upload file

 
  
    // return res.json(req.files)

    const message = await Message.create({
      text: req.body.text,
      image: image.filename,
      fichier: doc.filename,
      sender: req.user.id,
      receiver: req.body.receiver,
      conversation: req.body.conversation,
    });
    return res.status(201).json({ msg: "msg sended", data: message });
  } catch (error) {
    return res.status(500).send(error.message);
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
//messages sended
router.get("/message/send",auth,async function(req,res){
try {
  const messages = await Message.find({sender: req.user.id})
  .populate({path:"reicever"})
  if (messages.length === 0) return res.status(404).send("aucun message")
    return res.status(200).json({status:true,data:messages})
} catch (error) {
  return res.status(500).send(error.message)
}
})

//messages sended
router.get("/message/receive/:receiver",auth,async function(req,res){
  try {
    const messages = await Message.find({sender: req.params.receiver})
    .populate({path:"reicever"})
    if (messages.length === 0) return res.status(404).send("aucun message")
      return res.status(200).json({status:true,data:messages})
  } catch (error) {
    return res.status(500).send(error.message)
  }
  })
module.exports = router;
