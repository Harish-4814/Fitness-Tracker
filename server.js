const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const foodRoutes = require("./routes/foodRoutes");
const progressRoutes = require("./routes/progressRoutes");

const app = express();

/* Middleware */

app.use(express.json());
app.use(express.static("public"));

/* Routes */

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/progress", progressRoutes);

/* MongoDB Connection */

mongoose.connect(
    "mongodb://127.0.0.1:27017/fitnessTrackerDB"
)
.then(() => {

    console.log("✅ MongoDB Connected");

})
.catch((err) => {

    console.log("❌ MongoDB Error:", err);

});

/* Home Route */

app.get("/", (req, res) => {

    res.send(
        "Fitness Tracker Server Running"
    );

});

/* Start Server */

app.listen(5000, () => {

    console.log(
        "🚀 Server running on port 5000"
    );

    console.log(
        "🌐 Open: http://localhost:5000/index.html"
    );

});