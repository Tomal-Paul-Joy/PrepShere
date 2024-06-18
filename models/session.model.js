const mongoose = require("mongoose");
const sessionSchema = mongoose.Schema({ 
    token: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true,
    },
    email: { 
         type: String,
         required: true ,
    }
})

module.exports = mongoose.model("session",sessionSchema);