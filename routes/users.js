var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});


router.post("/users/created", async (req, res) => {
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
        role: ADMIN,
        token: null,
      });
      return res.status.json({ msg: "admin created", data: user });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
