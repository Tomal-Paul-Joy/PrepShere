const express = require("express"); 
const router = express.Router(); 
const auth = require("../middlewares/auth.teacher"); 
const { getUser, createUser, findUser, goToMainPage, goToRoutine, logout, seePapers, seePapersPages, seePaperCheck, paperCheck } = require("../controllers/teacher"); 
const { userRegistrationValidFor, runValidation } = require("../validation/uservalidation"); 

router.get("/teacher/register", getUser);
router.post("/teacher/register", userRegistrationValidFor, runValidation, createUser); 
router.post("/teacher/login", userRegistrationValidFor, runValidation, findUser); 
router.get("/teacher/main", auth, goToMainPage); 
router.get("/teacher/main/routine", auth, goToRoutine); 
router.get("/teacher/logout", logout);
router.get("/teacher/main/papers",auth,seePapers); 
router.get("/teacher/main/papers-pages",auth,seePapersPages); 
router.get("/teacher/main/papers/:userEmail",auth,seePaperCheck); 
router.get("/teacher/main/papers-pages/:userEmail", auth, paperCheck);

module.exports = router;
