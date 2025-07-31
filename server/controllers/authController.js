const User = require("../models/User.jsx");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });
    const token = createToken(user._id);
    res.status(201).json({ user: { email: user.email }, token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.status(200).json({ user: { email: user.email }, token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
