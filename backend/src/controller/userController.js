const  UserModel  = require("../model/user.model");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const loginController =  (user) => {
  console.log(user, "cont");
  const { name, telgram_user_id } = user;
  const new_user = new UserModel({ name, telgram_user_id });
   new_user.save();
  return "Login Successfull!";
};

module.exports = loginController;
