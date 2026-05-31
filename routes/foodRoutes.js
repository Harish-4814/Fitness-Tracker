const express = require("express");
const Food = require("../models/Food");
const FoodLog = require("../models/FoodLog");

const router = express.Router();

/* GET ALL FOODS */

router.get("/", async (req, res) => {

    try {

        const foods = await Food.find();

        res.json(foods);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/* ADD FOOD */

router.post("/add", async (req, res) => {

    try {

        const {
            username,
            foodName,
            quantity
        } = req.body;

        const food =
        await Food.findOne({
            name: foodName
        });

        if (!food) {

            return res.status(404).json({
                message: "Food Not Found"
            });

        }

        const factor =
        quantity / 100;

        const log =
        new FoodLog({

            username,

            foodName,

            quantity,

            calories:
            Number((food.calories * factor).toFixed(2)),

            protein:
            Number((food.protein * factor).toFixed(2)),

            carbs:
            Number((food.carbs * factor).toFixed(2)),

            fats:
            Number((food.fats * factor).toFixed(2))

        });

        await log.save();

        res.json({
            message: "Food Added Successfully",
            log
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

});

/* TODAY'S FOOD LOGS */

router.get("/today/:username", async (req, res) => {

    try {

        const start =
        new Date();

        start.setHours(
            0,0,0,0
        );

        const end =
        new Date();

        end.setHours(
            23,59,59,999
        );

        const logs =
        await FoodLog.find({

            username:
            req.params.username,

            date:{
                $gte:start,
                $lte:end
            }

        });

        res.json(logs);

    } catch (error) {

        res.status(500).json({
            message:error.message
        });

    }

});

/* YESTERDAY'S FOOD LOGS */

router.get("/yesterday/:username", async (req, res) => {

    try {

        const start =
        new Date();

        start.setDate(
            start.getDate()-1
        );

        start.setHours(
            0,0,0,0
        );

        const end =
        new Date();

        end.setDate(
            end.getDate()-1
        );

        end.setHours(
            23,59,59,999
        );

        const logs =
        await FoodLog.find({

            username:
            req.params.username,

            date:{
                $gte:start,
                $lte:end
            }

        });

        res.json(logs);

    } catch (error) {

        res.status(500).json({
            message:error.message
        });

    }

});

/* ALL FOOD LOGS */

router.get("/logs/:username", async (req, res) => {

    try {

        const logs =
        await FoodLog.find({

            username:
            req.params.username

        });

        res.json(logs);

    } catch (error) {

        res.status(500).json({
            message:error.message
        });

    }

});

/* DELETE LOGS */

router.delete("/logs/:username", async (req, res) => {

    try {

        await FoodLog.deleteMany({

            username:
            req.params.username

        });

        res.json({
            message:
            "Food Logs Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message:error.message
        });

    }

});

module.exports = router;