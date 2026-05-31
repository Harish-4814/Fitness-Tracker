const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

/* SIGNUP */
router.post("/signup", async (req, res) => {

    try {

        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "Signup Successful"
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

});

/* LOGIN */
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!isMatch){
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        res.status(200).json({
            message: "Login Successful",
            username: user.username
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;