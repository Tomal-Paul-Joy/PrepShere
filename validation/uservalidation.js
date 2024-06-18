const {check,validationResult} = require("express-validator"); 

exports.userRegistrationValidFor = [
check("email")
.trim()
.notEmpty()
.withMessage("email is missing") 
.isEmail()
.withMessage("not a valid email"), 
check("password")
.trim()
.notEmpty()
.withMessage("password is missing")
.isLength({min:5}) 
.withMessage("must have 5 character")
]
exports.runValidation = (req,res,next)=> { 
    const errors = validationResult(req); 
    if (!errors.isEmpty()) { 
        return res.status(400).json( { error: errors.array()} ); 
    }
    next(); 
}
