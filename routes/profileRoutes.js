const express = require("express");
const Profile = require("../models/Profile");

const router = express.Router();

/* TEST ROUTE */

router.get("/test", (req, res) => {
    res.send("Profile Route Working");
});

/* SAVE PROFILE */

router.post("/save", async (req, res) => {

    try {

        const profile = new Profile(req.body);

        await profile.save();

        res.json({
            message: "Profile Saved Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

});

/* DASHBOARD DATA */

router.get("/dashboard/:username", async (req, res) => {

    try {

        const profile = await Profile.findOne({
            username: req.params.username
        });

        if (!profile) {

            return res.status(404).json({
                message: "Profile Not Found"
            });

        }

        const heightM = profile.height / 100;

        const bmi =
        profile.currentWeight /
        (heightM * heightM);

        let calories =
        profile.currentWeight * 30;

        if (profile.goal === "Muscle Gain") {
            calories += 300;
        }

        if (profile.goal === "Fat Loss") {
            calories -= 300;
        }

        const protein =
        Math.round(profile.currentWeight * 2);

        const fats =
        Math.round(profile.currentWeight * 0.8);

        const carbs =
        Math.round(
            (calories -
            (protein * 4 + fats * 9))
            / 4
        );

        res.json({
            bmi: bmi.toFixed(2),
            calories,
            protein,
            carbs,
            fats,
            currentWeight:
            profile.currentWeight,
            goalWeight:
            profile.goalWeight,
            goal:
            profile.goal
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

});

/* GET PROFILE */

router.get("/:username", async (req, res) => {

    try {

        const profile = await Profile.findOne({
            username: req.params.username
        });

        if (!profile) {

            return res.status(404).json({
                message: "Profile Not Found"
            });

        }

        res.json(profile);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;