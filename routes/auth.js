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
 * @param {string} req.body.email_new - The admin's phone email.
 * @param {string} req.body.pwd - The admin's password.
 * @param {string} req.body.pseudo - The admin's pseudo.
 * @returns {Object} - The response object containing a success message and the created admin user data if successful, or an error message if not.
 * @throws Will throw an error if the request body is missing any required fields or if a user with the same phone number already exists.
 */
router.post("/auth/signup", async (req, res) => {
  try {
    if (req.body.pwd === "" || req.body.pseudo ==='' || req.body.email_old === "")
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
 * @param {string} req.body.email_old - The user's email_old.
 * @param {string} req.body.new - The user's email_new.
 * @param {string} req.body.pwd - The user's password.
 * @returns {Object} - The response object containing the user's data and token if successful, or an error message if not.
 */
router.post("/auth/login", async function (req, res) {
  const { email_new,email_old, pwd } = req.body;
  try {
    const user = await User.findOne({ email_old });
    if (!user) return res.status(404).send("password or email incorrect");
    const valid = await bcrypte.compare(pwd, user.password);
    if (!valid)
      return res.status(404).send("password or email incorrect");

    const payload = {
      id: user._id,
      pseudo: user.pseudo,
      email: user.email_new,
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
