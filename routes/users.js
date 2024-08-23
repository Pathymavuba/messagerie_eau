var express = require('express');
var  router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin")
const { USER } = require('../helpers/roles');
const User = require("../model/user");
const {sendToNewUser} = require("../helpers/mailConfig")

/**
 * This function handles the retrieval of all users from the database.
 * It requires authentication and does not have any specific role requirements.
 *
 * @param {Object} req - The request object containing the user's data.
 * @param {Object} res - The response object to send back to the client.
 * @returns {Object} - The response object with a status code and a JSON object containing the users data.
 * @throws Will throw an error if any exception occurs during the database operation.
 */
router.get('/users',auth, function(req, res) {
 
  User.find()
  .then(users=>res.status(200).json({data:users}))
  .catch(err=>res.status(500).json({e:err}))
});


/**
 * This function handles the creation of a new user by an admin.
 * It checks if the required fields are filled, validates the user's phone number,
 * and creates a new user in the database with hashed password.
 *
 * @param {Object} req - The request object containing the user's data.
 * @param {Object} res - The response object to send back to the client.
 * @param {string} req.body.email_old - The user's  email.
 * @param {string} req.body.pwd - The user's password.
 * @param {string} req.body.pseudo - The user's pseudo.
 * @returns {Object} - The response object with a status code and a message or data.
 * @throws Will throw an error if any exception occurs during the process.
 */
router.post("/users/created",auth,isAdmin, async (req, res) => {
  try {
    if (req.body.email_old === "" || req.body.pwd === "" || req.body.pseudo === '')
      return res.status(400).send("remplissez tous les champs");
    else {
      const oldUser = await User.findOne({ email_old: req.body.email_old });
      if (oldUser) return res.status(409).send("user exists");
      const hash = await bcrypte.hash(req.body.pwd, 10);
      const user = await User.create({
        pseudo: req.body.pseudo,
        email_old: req.body.email_old,
        email_new:req.body.email_old.split("@")[0]+"@regideso.cd",
        password: hash,
        role: USER,
        token: null,
      });
      sendToNewUser(user.email_old,"creation de compte",user.email_new,user.password)
      return res.status.json({ msg: "user created", data: user });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
