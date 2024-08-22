const Spam = require("../model/spam");
const express = require("express");
const router = express.Router();
const upload = require("../helpers/multer");
const path = require("path");
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
router.post("/spam",auth, upload.array("file", 12), async (req, res) => {
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

    const spam = await Spam.create({
      text: req.body.text,
      image: image?.filename,
      fichier: doc?.filename,
      sender: req.user.id,
      receiver: req.body.receiver,
    //   conversation: req.body.conversation,
    });
    return res.status(201).json({ msg: "msg sended", data: spam });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});


//messages sended
router.get("/spam/send",auth,async function(req,res){
try {
  const spams = await Spam.find({sender: req.user.id})
  .populate({path:"reicever"})
  if (spams.length === 0) return res.status(404).send("aucun message")
    return res.status(200).json({status:true,data:spams})
} catch (error) {
  return res.status(500).send(error.message)
}
})

//messages received
router.get("/spam/receive/:receiver",auth,async function(req,res){
  try {
    const spams = await Spam.find({sender: req.params.receiver})
    .populate({path:"reicever"})
    if (spams.length === 0) return res.status(404).send("aucun message")
      return res.status(200).json({status:true,data:spams})
  } catch (error) {
    return res.status(500).send(error.message)
  }
  })

  //getOne 
  router.get("/spam/:id",auth,async (req,res)=>{
    try {
        const spam = await Spam.findOne({_id:id})
        if (!spam) return res.status(404).send('no message')
        return res.status(200).json({status:true,data:spam})
        
    } catch (error) {
        return res.status(500).send(error.message)
    }
  })
module.exports = router;
