const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

//Sign Up
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashedpassword = bcrypt.hashSync(password);
    const user = new User({ email, username, password: hashedpassword });
    await user.save();
    res.status(200).json({message:"Sign Up Successfull"});
  } catch (error) {
    res.status(200).json({ message : "User Already Exists" });
  }
});


//log in 
router.post("/signin", async (req, res) => {
    try {
      const user = await User.findOne({email : req.body.email});
      if(!user) {
        res.status(200).json({message : "Please Sign Up first"});
      }

      const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
      if(!isPasswordCorrect) {
        res.status(200).json({message : "Password is Not Correct"});
      }
      const {password, ...others} = user._doc;
      res.status(200).json({others});
    } catch (error) {
      res.status(200).json({ error: error.message });
    }
  });

module.exports = router;
