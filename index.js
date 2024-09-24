const express = require('express');

const app = express();
const mongoose = require('mongoose');

const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config()

const todosRoutes = require('./routes/todos')
const usersRoutes = require('./routes/users')

//built in middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
app.use(express.json())

app.use("/todos",todosRoutes)
app.use("/users",usersRoutes)
app.use((err,req, res, next)=>{
    res.status(500).json({message: err.message})
})

mongoose.connect('mongodb+srv://finallproject17:PBPrKJNBpm9XKRVE@finalproject.8il93f2.mongodb.net/').then(()=>
{
    console.log("Connected to database successfully");
    
}).catch((err)=>{
    console.log(err);
    
})

//custom middleware
// app.use((req,res,next)=>{
//     console.log('done');
//     next();
// })


//end points .. routes
//GET ALL TODOS


app.listen(3000,()=>{
    console.log("Your server started on PORT 3000");
    
})
