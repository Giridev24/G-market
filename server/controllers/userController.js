const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) { 
      console.log("user not found")
      return res.status(404).json({ success: false, msg: "User not found" })}

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
    console.log("wrong password")
    return res.status(400).json({ success: false, msg: "Incorrect password" })}

    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '1d' });
    res.cookie('token', token);
    res.json({ success: true, msg: "Login success", token, user });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { login, signup };
