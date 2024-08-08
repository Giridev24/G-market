// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, msg: 'Token not available' });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ email: decoded.email });
    if (!user) return res.status(404).json({ success: false, msg: 'User not found' });
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, msg: 'Token invalid' });
  }
};

module.exports = verifyToken;
