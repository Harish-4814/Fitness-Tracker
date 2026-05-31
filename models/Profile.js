const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true
    },

    age:{
        type:Number,
        required:true
    },

    gender:{
        type:String,
        required:true
    },

    height:{
        type:Number,
        required:true
    },

    currentWeight:{
        type:Number,
        required:true
    },

    goalWeight:{
        type:Number,
        required:true
    },

    activityLevel:{
        type:String,
        required:true
    },

    dietType:{
        type:String,
        required:true
    },

    goal:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model("Profile", profileSchema);