const bcrypt = require("bcrypt");
const Users = require("../models/User");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");


router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, admin } = req.body;
    const userExists = await Users.findOne({ email });

    if (userExists) {
      return res.json({ msg: "User already exists" });
    }

    if (password.length < 6) {
      return res.json({ msg: "Password must be at least 6 characters long" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    await Users.create({ name, email, password: hashedPassword, admin });

    return res.json({ msg: "User created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

   
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        admin: user.admin,
      },
      "YOUR_SECRET_KEY", 
      { expiresIn: "2d" }
    );

    res.json({ msg: "Logged In", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
