const path = require("path"); 
const Teacher = require("../models/teacher.model");
const Session = require("../models/session.teacher.model");
const Marks = require("../models/marks"); 
const uuid4 = require("uuid4");
const Written = require("../models/user.written"); 
const Pdf = require('../models/pdf'); // Adjust the path as needed 

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

const paperCheckGet = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/paperCheck.html"));
};

const paperCheckPost = async (req, res) => {
  try {
      const userEmail = req.params.userEmail;
      const { qn1, qn2, qn3, qn4, qn5, qn6, qn7, qn8 } = req.body;

      console.log("Received data:", { userEmail, qn1, qn2, qn3, qn4, qn5, qn6, qn7, qn8 });

      const newMarks = new Marks({
          userEmail,
          qn1,
          qn2,
          qn3,
          qn4,
          qn5,
          qn6,
          qn7,
          qn8
      });

      await newMarks.save();
      res.status(200).send('Marks submitted successfully');
  } catch (error) {
      console.log("Error:", error);
      res.status(500).send("An error occurred");
  }
};
  
  const goToPdf =(req, res) => {
    res.sendFile(path.join(__dirname, '/../views/pdf1.html'));
  }; 
  
  const createPdf =  async (req, res) => {
    try {
      const { bookname, booklink } = req.body;
      const bookpic = req.file ? req.file.filename : null;
  
      const newPdf = new Pdf({
        bookname,
        bookpic,
        booklink
      });
  
      await newPdf.save();
      res.status(201).json({ message: 'PDF created successfully' });
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).send("An error occurred");
    }
  }
  
  const getAllPdfs = async (req, res) => {
    try {
      const pdfs = await Pdf.find();
      res.json(pdfs);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving PDFs', error });
    }
  }
  const createVideo = (req, res) => {
    res.sendFile(path.join(__dirname, '/../views/admin.html'));
  }; 
  const seeVideo =(req,res)=> { 
    res.sendFile(path.join(__dirname,'/../views/videos.html'))
  }
    
module.exports = { 
    getUser,
    createUser,
    findUser,
    goToMainPage,
    goToRoutine,
    logout,
    seePapers,
    seePapersPages,
    paperCheckGet,
    paperCheckPost,
    seePaperCheck,
    goToPdf,
    createPdf,
    getAllPdfs,
    createVideo,
    seeVideo

}
