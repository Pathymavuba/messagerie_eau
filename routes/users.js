var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin")
const { USER } = require('../helpers/roles');
const User = require("../model/user");

/* GET users listing. */
router.get('/users',auth, function(req, res, next) {
 
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
 * @param {string} req.body.tel - The user's phone number.
 * @param {string} req.body.pwd - The user's password.
 * @param {string} req.body.pseudo - The user's pseudo.
 * @returns {Object} - The response object with a status code and a message or data.
 * @throws Will throw an error if any exception occurs during the process.
 */
router.post("/users/created",auth,isAdmin, async (req, res) => {
  try {
    if (req.body.tel === "" || req.body.pwd === "" || req.body.pseudo)
      return res.status(400).send("remplissez tous les champs");
    else {
      const oldUser = await User.findOne({ phoneNuber: req.body.tel });
      if (oldUser) return res.status(409).send("user exists");
      const hash = await bcrypte.hash(req.body.pwd, 10);
      const user = await User.create({
        pseudo: req.body.pseudo,
        phoneNumber: req.body.tel,
        password: hash,
        role: USER,
        token: null,
      });
      return res.status.json({ msg: "user created", data: user });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
