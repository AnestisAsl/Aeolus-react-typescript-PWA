const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { response } = require("express");

router.post("/register", async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword)
      return res
        .status(400)
        .json({ msg: "Not all fields have been completed." });
    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters long." });
    if (password !== confirmPassword)
      return res.status(400).json({ msg: "Password fields don't match." });
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({
        msg: "This email already has been used for account creation.",
      });

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ msg: "Not all fields have been completed." });

    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "Wrong credentials." });
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return res.status(400).json({ msg: "Wrong credentials." });
    const token = jwt.sign({ id: user._id }, process.env.JWT_PASSWORD);

    res.json({
      token,
      user: {
        id: user._id,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/isLoggedIn", async (req, res) => {
  try {
    const token = req.header("auth-token"); //x-auth
    if (!token) return res.json(false);
    const verified = jwt.verified(token, process.env.JWT_PASSWORD);
    if (!verified) return res.json(false);
    //maybe jwt token exists but user has been deleted
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/", async (req, res) => {
  const token = req.header("auth-token"); //x-auth
  if (!token) return res.json(false);
  const verified = jwt.verified(token, process.env.JWT_PASSWORD);
  if (!verified) return res.json(false);
  const user = await User.findById(verified.id);
  if (!user) return res.json(false);
  return res.json({
    id: user._id,
  });
});

router.post("/addToMyList", async (req, res) => {
  try {
    console.log("about to save location");
    const { userId, location } = req.body;
    console.log(req.body);
    console.log(userId, location);
    if (!location)
      return res.status(400).json({
        msg: "Location field is empty, or this location has already been added to your list.",
      });
    await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { location: location } }
    );
    return res.json({ msg: "Location has been added." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/deleteFromMyList", async (req, res) => {
  try {
    console.log("about to delete location");
    const { userId, location } = req.body;
    console.log(req.body);
    console.log(userId, location);
    if (!location) return res.status(400).json({ msg: "No location choice." });
    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { location: location } }
    );
    return res.json({ msg: "Location has been deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/displayMyLocations", async (req, res) => {
  try {
    console.log("about to display locations");
    const { userId } = req.body;
    console.log(req.body);
    console.log(userId);
    const user = await User.findOne({ _id: userId });
    res.json(user.location);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/fetchLocationData", async (req, res) => {});

router.post("/fetchWeatherData", async (req, res) => {});
module.exports = router;
