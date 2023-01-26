const User = require("../models/user.model");

exports.postRegisterUser = async (req, res) => {
  try {
    await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.isLoggedIn = true;
    req.session.userEmail = req.body.email;
    res.json({ status: "ok", isLoggedIn: true });
  } catch (error) {
    res.json({ status: "error", error: `Input invalid: ${error}` });
  }
};

exports.postUserName = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.session.userEmail });
    if (!user) {
      res.clearCookie("connect.sid");
      res.send(401, "Invalid session token");
      return;
    }

    res.json({ firstName: user.firstName, lastName: user.lastName });
  } catch (error) {
    res.json({ error: error });
  }
};

exports.postLogOutUser = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
    } else {
      res.clearCookie("connect.sid");
      res.json({ isLoggedOut: true });
    }
  });
};
