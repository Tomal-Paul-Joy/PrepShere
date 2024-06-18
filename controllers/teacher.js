const path = require("path"); 
const Teacher = require("../models/teacher.model");
const Session = require("../models/session.teacher.model");
const uuid4 = require("uuid4");
const Written = require("../models/user.written"); 

const getUser = (req, res) => { 
    res.sendFile(path.join(__dirname + "/../views/SignUp1.html")); 
}

const createUser = async(req,res)=> { 
    const {teacher,email,password,dob} = req.body; 
    try { 
        const newUser = new Teacher(req.body); 
        await newUser.save(); 
        res.status(201).json(newUser); 
    }
    catch(error) { 
        res.status(500).json(error.message); 
    }
}

const findUser = async (req, res) => { 
    const { email, password } = req.body;
    try { 
        const user = await Teacher.findOne({ email });
        if (user && user.password === password) {
            const token = uuid4();
            res.cookie("token", token, { maxAge: 1000 * 3600 * 24 * 30 });
            const newSession = new Session({ user, token, email });
            await newSession.save();
            res.redirect('/teacher/main');
        } else { 
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) { 
        console.error("Error finding user:", error); // Log the error
        res.status(500).json({ message: error.message }); 
    }
}
const goToMainPage = (req,res)=> { 
    res.sendFile(path.join(__dirname+"/../views/main1.html")); 
}
const goToRoutine = (req,res)=> { 
    res.sendFile(path.join(__dirname+"/../views/routine1.html")); 
}
const logout = async (req, res) => {
    const token = req.cookies.token;
    await Session.deleteOne({token: token});
    res.clearCookie("token");
    res.redirect("/teacher/login");
}
const seePapers = async (req, res) => {
    try {
      const written = await Written.find({});
      res.status(200).json(written);
    } catch (error) {
      console.log(error);
      res.status(500).send("An error occurred");
    }
  };
  
  const seePapersPages = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/papers.html"));
  };
  const seePaperCheck = async (req, res) => {
    try {
        const email = req.params.userEmail; 
        const written = await Written.findOne({ userEmail: email }); 
        if (!written) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(written);
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred");
    }
};

  const paperCheck = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/paperCheck.html")); 
  };
  
  
    
module.exports = { 
    getUser,
    createUser,
    findUser,
    goToMainPage,
    goToRoutine,
    logout,
    seePapers,
    seePapersPages,
    paperCheck,
    seePaperCheck,
}
