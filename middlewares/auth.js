const User = require("../models/user.model");
const Session = require("../models/session.model"); 
const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Authentication Token Missing" });

  try {
    const session = await Session.findOne({ token: token });
    if (!session) return res.status(401).json({ message: "Invalid Authentication Token" });

    const user = await User.findOne({ _id: session.user });
    if (!user) return res.status(401).json({ message: "User not found" });

    // Attach user object and email to req.user
    req.user = user;
    req.email = session.email;

    next();
  } catch (error) {
    console.error("Error: ", error);
    return res.status(403).json({ message: "Invalid Token" });
  }
};




module.exports = auth ; 

