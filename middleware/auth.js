
const jwt = require("jsonwebtoken");
let User  = require("../model/user");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.token = token;
    req.user = decoded
    const user_conected = await User.findById(req.user.id);
    if (user_conected.token === null) {
      return res.status(403).send("A token is required for authentication");
    }
    next()
  } catch (err) {  
    return res.status(401).send("Invalid Token , connectez-vous");
  }
  return next();
};  

module.exports = verifyToken;
