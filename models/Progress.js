const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true
    },

    weight:{
        type:Number,
        required:true
    },

    date:{
        type:Date,
        default:Date.now
    }

});

module.exports =
mongoose.model("Progress", progressSchema);