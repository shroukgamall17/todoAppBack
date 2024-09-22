
const userModel = require('../models/users')
const bcrypt=require("bcrypt")
var jwt = require('jsonwebtoken');
const getAllUsers= async (req, res) => {

   try{
let users = await userModel.find()
res.status(200).json({data:users})
   }catch(err){
    res.status(500).json({message: err.message})
   }
} 

const createUser = async (req,res)=>{
let user=req.body;
try{
let newUser= await userModel.create(user)
res.status(200).json({data:newUser})
}catch(err){
    res.status(500).json({message: err.message})
   }}

 const login = async (req, res) => {
  // req.body
  let { email, password } = req.body;

  // Check email, password >> res you must provide email and password
  if (!email || !password) {
    return res.status(400).json({ message: 'email and password required' });
  }

  // Email >> res invalid email, password
  let user = await userModel.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ message: 'invalid email or password' });
  }
  //////////////////////////////////////////////
  // Password >> res invalid email, password
  let isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: 'check password or email' });
  }
  let token = jwt.sign(
    { data: { email: user.email, id: user._id } },
    process.env.SECRET,
    { expiresIn: '1h' }
  );

  return res.status(200).json({ message: 'you logged in successfully', token: token });
};

module.exports ={getAllUsers,createUser,login}  