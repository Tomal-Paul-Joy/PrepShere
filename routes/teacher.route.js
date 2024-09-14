const express = require("express"); 
const router = express.Router(); 
const multer = require("multer") ;
const auth = require("../middlewares/auth.teacher"); 
const { getUser, createUser, findUser, goToMainPage, goToRoutine, logout, seePapers, seePapersPages, seePaperCheck, paperCheck, goToPdf, createPdf, getAllPdfs, createVideo, seeVideo, paperCheckPost, paperCheckGet } = require("../controllers/teacher"); 
const { userRegistrationValidFor, runValidation } = require("../validation/uservalidation"); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
      const name = Date.now() + "-" + file.originalname;
      cb(null, name);
    }
  });
  
  const upload = multer({ storage: storage });
router.get("/teacher/register",getUser); 
router.post("/teacher/register", userRegistrationValidFor, runValidation, createUser); 
router.post("/teacher/login", userRegistrationValidFor, runValidation, findUser); 
router.get("/teacher/main", auth, goToMainPage); 
router.get("/teacher/main/routine", auth, goToRoutine); 
router.get("/teacher/logout", logout);
router.get("/teacher/main/papers",auth,seePapers); 
router.get("/teacher/main/papers-pages",auth,seePapersPages); 
router.get("/teacher/main/papers/:userEmail", seePaperCheck);
router.get("/teacher/main/papers-pages/:userEmail", paperCheckGet);
router.post("/teacher/main/papers-pages/:userEmail", paperCheckPost); 
router.get("/teacher/main/pdf", auth, goToPdf);
router.get("/teacher/main/getPdfs", auth, getAllPdfs);
router.post("/teacher/main/pdf", auth, upload.single('bookpic'),createPdf);
// routes/videos.js



const Video = require('../models/video'); 

// Route to add a new video
router.get('/teacher/add',auth,createVideo); 
router.post('/teacher/add', async (req, res) => {
    try {
      const { title, iframeLink } = req.body;
  
      const newVideo = new Video({
        title,
        iframeLink
      });
  
      await newVideo.save();
      res.status(201).json({ message: 'Video added successfully' });
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).send("An error occurred");
    }
  });
  
  // Route to get all videos
  router.get('/teacher/getAll', async (req, res) => {
    try {
      const videos = await Video.find();
      res.json(videos);
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).send("An error occurred");
    }
  });
  router.get('/teacher/show',seeVideo); 

  
  

module.exports = router;
