const userModel = require("../models/user");

const userControllers = {};

userControllers.checkUser = async (req, res)=>{
  const {name, encryptedPassword} = req.params;

  const user = await userModel.find({
    name,
    encryptedPassword,
  });
  if (user) {
    res.json({message: "valid user"});
  } else {
    res.status(400).send({message: "invalid user"});
  }
};

userControllers.createUser = async (req, res)=>{
  const {name, encryptedPassword} = req.body;
  if (name, encryptedPassword) {
    userModel({
      name, encryptedPassword,
    });
    res.json({message: "user saved!"});
  } else {
    res.status(400).send({message: "user data incomplete"});
  }
};

module.exports = userControllers;
