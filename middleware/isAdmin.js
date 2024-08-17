
const jwt = require("jsonwebtoken");
let User  = require("../model/user");
const { ADMIN } = require("../helpers/roles");
require("dotenv").config();

const verifyRole = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.token = token;
    req.user = decoded
    const user_conected = await User.findById(req.user.id);
    if (user_conected.role !== ADMIN) {
      return res.status(403).send("user is not admin");
    }
    next()
  } catch (err) {  
    return res.status(500).send(err);
  }
  return next();
};  

module.exports = verifyRole;
