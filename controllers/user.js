
const path = require("path"); 
const app = require("../app"); 

const User = require("../models/user.model");
const Session = require("../models/session.model"); 
const Written = require("../models/user.written"); 
const uuid4 = require("uuid4");
const auth= require("../middlewares/auth"); 





const getUser = (req,res)=> { 
    res.sendFile(path.join(__dirname+"/../views/SignUp.html")); 
}

const createUser = async(req,res)=> { 
    const {name,email,password,dob} = req.body; 
    try { 
        const newUser = new User(req.body); 
        await newUser.save(); 
        res.status(201).json(newUser); 
    }
    catch(error) { 
        res.status(500).json(error.message); 
    }
}

const findUser = async(req,res)=> { 

     try { 
        const {email,password} = req.body;
        const user = await User.findOne({email:email}); 
        console.log(user.email); 
        if (user && user.password===password) { 

            const token = uuid4();
            const emaill = user.email; 
            res.cookie("token", token, {maxAge: 1000*3600*24*30});
            let newSession = Session({user: user, token: token, email: emaill});
            newSession.save();
            res.redirect('/student/main');
            
            
            
        }
        else  { 
            res.status(401).json({ 
                message: "Invalid email"
            })
        }
     }
     catch(error) { 
        res.status(401).json(error.message); 
     }
}



const logout = async (req, res) => {
    const token = req.cookies.token;
    await Session.deleteOne({token: token});
    res.clearCookie("token");
    res.redirect("/student/login");
}
const goToMainPage = (req,res)=> { 
    res.sendFile(path.join(__dirname+"/../views/main.html")); 
}
const goToPdf = (req,res) => { 
    res.sendFile(path.join(__dirname+"/../views/pdf.html")); 
}
const goToExam = (req,res)=> { 
    res.sendFile(path.join(__dirname+"/../views/practice_test_home.html"));
}
const goLecture = (req,res)=> { 
    res.sendFile(path.join(__dirname+"/../views/practice_test_home2.html")); 
}
const goLecturegk = (req,res)=> { 
    res.sendFile(path.join(__dirname+"/../views/videos.html")); 
}

const goToExamBcsMcq = (req,res) => { 
    res.sendFile(path.join(__dirname+"/../views/mcq.html")); 
}
const goToExamBcsWritten = (req,res) =>  { 
    res.sendFile(path.join(__dirname+"/../views/written.html")); 
}
const goToRoutine = (req,res)=> { 
    res.sendFile(path.join(__dirname+"/../views/routine.html")); 
}
const attendExam = async (req, res) => {
    try {
      const imagePaths = {
        userEmail: req.email, // Access email directly from req.email
        images: {
         
        }
      };
      for (let i = 1; i <= 8; i++) {
        const fieldName = `image${i}`;
        if (req.files[fieldName]) {
            imagePaths.images[fieldName] = `/uploads/${req.files[fieldName][0].filename}`;
        } else {
            imagePaths.images[fieldName] = null;
        }
    }
  
      const newWritten = new Written(imagePaths);
      await newWritten.save();
  
      res.status(200).json(imagePaths);
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).send("An error occurred");
    }
  };
  
  

  

module.exports =  { 
    getUser,
    createUser,
    findUser,
    goToMainPage,
    goToPdf,
    goToExam,
    goLecture,
    goLecturegk,
    goToExamBcsMcq,
    goToExamBcsWritten,
    goToRoutine,
    logout,
    attendExam,
    
   
};