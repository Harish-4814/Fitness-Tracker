const mongoose = require("mongoose");

const foodLogSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true
    },

    foodName:{
        type:String,
        required:true
    },

    quantity:{
        type:Number,
        required:true
    },

    calories:{
        type:Number,
        required:true
    },

    protein:{
        type:Number,
        required:true
    },

    carbs:{
        type:Number,
        required:true
    },

    fats:{
        type:Number,
        required:true
    },

    date:{
        type:Date,
        default:Date.now
    }

});

module.exports =
mongoose.model("FoodLog", foodLogSchema);