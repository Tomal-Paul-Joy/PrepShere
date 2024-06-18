
const express = require("express") ;
const multer = require("multer");

const {getUser, createUser, findUser, goToMainPage, goToPdf, goToExam, goLecture, goLecturegk, goToExamBcsMcq, goToExamBcsWritten, goToRoutine, logout, attendExam, seePapers, seePapersPages, paperCheck, seePaperCheck, find1User, create1User} = require("../controllers/user");
const { userRegistrationValidFor, runValidation } = require("../validation/uservalidation");
const router = express.Router(); 
const auth = require("../middlewares/auth");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const name = Date.now() + "-" + file.originalname;
      cb(null, name);
    }
  });
  
  const upload = multer({ storage: storage });
router.get("/student/register", getUser);

router.post("/student/register", userRegistrationValidFor,runValidation,createUser); 
router.post("/student/login", userRegistrationValidFor, runValidation, findUser); 
 

router.get("/student/main", auth, goToMainPage); 
router.get("/student/main/routine", auth, goToRoutine); 
router.get("/student/main/pdf", auth, goToPdf); 
router.get("/student/main/exam", auth, goToExam);
router.get("/student/main/exam/bcs/mcq", auth, goToExamBcsMcq); 
router.get("/student/main/exam/bcs/written", auth, goToExamBcsWritten); 
router.get("/student/main/lecture", auth, goLecture);
router.get("/student/main/lecture/gk", auth, goLecturegk);  
router.get("/student/logout", logout);
router.post("/student/main/exam/bcs/written", auth,upload.fields([{ name: 'image1' }, { name: 'image2' }, { name: 'image3' }, { name: 'image4' }, { name: 'image5' }, { name: 'image6' }, { name: 'image7' }, { name: 'image8' }]),attendExam);



module.exports = router ;