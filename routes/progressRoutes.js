const express = require("express");
const Progress = require("../models/Progress");

const router = express.Router();

/* TEST ROUTE */

router.get("/test", (req, res) => {

    res.send("Progress Route Working");

});

/* ADD WEIGHT ENTRY */

router.post("/add", async (req, res) => {

    try {

        const progress = new Progress({

            username: req.body.username,

            weight: req.body.weight

        });

        await progress.save();

        res.json({

            message: "Weight Saved Successfully"

        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

});

/* GET ALL WEIGHT LOGS */

router.get("/:username", async (req, res) => {

    try {

        const logs = await Progress.find({

            username: req.params.username

        }).sort({

            date: 1

        });

        res.json(logs);

    }
    catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

});

/* DELETE ALL WEIGHT LOGS */

router.delete("/:username", async (req, res) => {

    try {

        await Progress.deleteMany({

            username: req.params.username

        });

        res.json({

            message: "All Progress Logs Deleted"

        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

});

module.exports = router;