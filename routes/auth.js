const User = require("../model/user");
const express = require("express");
const router = express.Router();
const bcrypte = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { ADMIN } = require("../helpers/roles");


/**
 * Handles the signup process for an admin user.
 *
 * @param {Object} req - The request object containing the admin's phone number, password, and pseudo.
 * @param {Object} res - The response object to send back to the client.
 * @param {string} req.body.email - The admin's phone email.
 * @param {string} req.body.pwd - The admin's password.
 * @param {string} req.body.pseudo - The admin's pseudo.
 * @returns {Object} - The response object containing a success message and the created admin user data if successful, or an error message if not.
 * @throws Will throw an error if the request body is missing any required fields or if a user with the same phone number already exists.
 */
router.post("/auth/signup", async (req, res) => {
  try {
    if (req.body.pwd === "" || req.body.pseudo ==='' || req.body.email === "")
      return res.status(400).send("remplissez tous les champs");
    else {
      console.log(req.body)
      const oldUser = await User.findOne({ email: req.body.email });
      if (oldUser) return res.status(409).send("user exists");
      const hash = await bcrypte.hash(req.body.pwd, 10);
      const user = await User.create({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash,
        role: ADMIN,
        token: null,
      });
      return res.status(201).json({ msg: "admin created", data: user });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

/**
 * Handles user login and token generation.
 *
 * @param {Object} req - The request object containing the user's phone number and password.
 * @param {Object} res - The response object to send back to the client.
 * @param {string} req.body.tel - The user's phone number.
 * @param {string} req.body.pwd - The user's password.
 * @returns {Object} - The response object containing the user's data and token if successful, or an error message if not.
 */
router.post("/auth/login", async function (req, res) {
  const { email, pwd } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("password or phoneNumber incorrect");
    const valid = await bcrypte.compare(pwd, user.password);
    if (!valid)
      return res.status(404).send("password or phoneNumber incorrect");

    const payload = {
      id: user._id,
      pseudo: user.pseudo,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    await User.updateOne({ _id: user._id }, { token });

    delete user.token;

    return res
      .status(200)
      .json({
        statut: true,
        msg: "user connected succefully",
        data: user,
        token: token,
      });
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * Handles user logout and token invalidation.
 *
 * @param {Object} req - The request object containing the user's ID.
 * @param {Object} res - The response object to send back to the client.
 * @returns {Object} - The response object containing a success message if the user is successfully logged out, or an error message if not.
 * @throws Will throw an error if there is an issue updating the user's token in the database.
 */

router.get("/auth/deconnected", auth, async (req, res) => {
  try {
    await User.updateOne({ _id: req.user.id }, { token: null });
    return res.status(200).send("user deconnected");
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
