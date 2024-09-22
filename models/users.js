const mongoose =require('mongoose');
const bcrypt = require('bcrypt');


const usersSchema =mongoose.Schema({

name:{
    type:String,
    unique: true,

},
email:{
    type:String,
    unique: true
 
},
password:{
type:String,
required:true},

role:{
    type:String,
    default:'User'
}
})
//middleware
usersSchema.pre('save', async function(next){

let salt =await  bcrypt.genSalt(17);
let hashedPassword= await bcrypt.hash(this.password,salt)
this.password = hashedPassword;
    next();
})


const userModel =mongoose.model('User',usersSchema);
module.exports =userModel;