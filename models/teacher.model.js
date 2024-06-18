const mongoose = require("mongoose"); 

const teacherSchema = mongoose.Schema({ 
    teacher: { 
        type: String,
        required: true 
    },
    email: { 
        type: String,
        required: true 
    },
    password: { 
        type: String,
        required: true 
    },
    dob: {
        type: String,
        required: true 
    }
});

module.exports = mongoose.model("Teacher", teacherSchema); // Ensure model name is "Teacher"
