const router = require("express").Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const UserPost = mongoose.model("UserPost");

router.post("/signup", async (req, res) => {
    const newuser = new User();
    newuser.Name = req.body.name;
    newuser.Email = req.body.email;
    newuser.Password = req.body.password;

    await newuser.save((err, response) => {
        if(err){
            res.send(err)
        }else{
            res.send(newuser._id)
        }
    })
})

router.post("/login", async (req, res) => {
  const userData = await User.findOne({ Email : req.body.email , Password : req.body.password}, function (err,user){
    if(err){
      return res.status(500).send();
    }
    if(!user){
      return res.status(200).send("invalid");
    }
    return res.status(200).send(user);
  })
});

router.get("/getPost", async (req, res) => {
  console.log(req.body.token);
  /*const updatepost = await UserPost.findOne({UserId: req.body.token });
  res.send(updatepost);*/
});

router.post("/uploadPost", async (req, res) => {
console.log(req.body)
 const newuserpost = new UserPost();
 newuserpost.postDesc = req.body.newpost;
 newuserpost.UserId = req.body.token;

 const userDetails = await User.findOne({ _id: req.body.token });
 userDetails.UserPost.push(newuserpost._id);
 await userDetails.save();

 await newuserpost.save((err, response) => {
  if(err){
      res.send(err)
  }else{
      res.send(newuserpost)
  }
})

})



module.exports = router;




