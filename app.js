const express = require("express");
const app = express();
const path = require("path");
const cookiePerser = require("cookie-parser");
const bodyparser = require("body-parser");
require("dotenv").config(); 
const mongoose = require("mongoose"); 
const dbURL = process.env.MONGO_URL; 
const cors = require('cors');  
mongoose.connect(dbURL) 
.then(
    ()=> { 
        console.log("mongodb atlas connected") ; 
    }
)
.catch(
    (error)=> { 
        console.log(error); 
        process.exit(1); 
    }
)

app.use(cors());
app.use(cookiePerser());
app.use(bodyparser.urlencoded({ extended: true })); 
app.use(bodyparser.json()); 
const userRouter = require("./routes/route");
const teacherRouter = require("./routes/teacher.route"); 

app.use(express.static(path.join(__dirname, 'styles')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname,'js'))); 
app.use(userRouter);
app.use(teacherRouter); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




app.get("/student/login", (req, res) => {
    const token = req.cookies.token;
    if (token) { 
        return res.redirect("/student/main");
    } 
    res.sendFile(__dirname + "/views/index.html");
});
app.get("/teacher/login", (req, res) => {
    const token = req.cookies.token;
    if (token) { 
        return res.redirect("/teacher/main");
    } 
    res.sendFile(__dirname + "/views/index1.html");
});



app.use((req,res,next)=> { 
    res.status(400).json({ 
        message:"wrong route",
    })
})
app.use((err,req,res,next)=> { 
    res.status(500).json({
        message:"server error",
    })
})



module.exports =  app; 

