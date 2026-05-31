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

        const heightM =
        profile.height / 100;

        const bmi =
        profile.currentWeight /
        (heightM * heightM);

        /* BASE CALORIES */

        let calories =
        profile.currentWeight * 24;

        /* ACTIVITY LEVEL */

        switch(profile.activityLevel){

            case "Sedentary":
                calories *= 1.2;
                break;

            case "Lightly Active":
                calories *= 1.375;
                break;

            case "Moderately Active":
                calories *= 1.55;
                break;

            case "Very Active":
                calories *= 1.725;
                break;

            default:
                calories *= 1.2;
        }

        /* GOAL DURATION */

        const weightDifference =
        Math.abs(
            profile.goalWeight -
            profile.currentWeight
        );

        const totalCaloriesNeeded =
        weightDifference * 7700;

        const days =
        profile.goalDuration * 7;

        const dailyAdjustment =
        Math.round(
            totalCaloriesNeeded / days
        );

        if(profile.goal === "Fat Loss"){

            calories -= dailyAdjustment;

        }
        else if(profile.goal === "Muscle Gain"){

            calories += dailyAdjustment;

        }

        calories =
        Math.round(calories);

        /* MACROS */

        const protein =
        Math.round(
            profile.currentWeight * 2
        );

        const fats =
        Math.round(
            profile.currentWeight * 0.8
        );

        const carbs =
        Math.round(
            (
                calories -
                (
                    protein * 4 +
                    fats * 9
                )
            ) / 4
        );

        res.json({

            bmi:
            bmi.toFixed(2),

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