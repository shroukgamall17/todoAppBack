const  mongoose  = require("mongoose")

//schema
const todosSchema =mongoose.Schema(
    {
       title:{
        type :String,
        required :[true,'sorry,  title is required'],
        unique:true,
        minLength:3,
        maxLength:30,
        trim:true
       },
       status:{
        type :String,
        enum:["done","in progress" , 'todo'],
        default:"todo",
        //done // in progress // ,todo   default :todo //////// 
    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
    }



})


const todoModel =mongoose.model('Todo',todosSchema)
module.exports=todoModel