const express= require('express');
const router =express.Router();
const fs = require('fs');
const {auth} =require("../middleware/auth")

const {getAllTodos,getTodoById ,createNewTodo,updateTodoById} = require('../controllers/todos')
//end points .. routes


//GET ALL TODOS
router.get('/',auth,getAllTodos)
 
 //Get TODO BY ID
 router.get("/:id",getTodoById)
 
 //CREATE NEW TODO
 router.post('/',createNewTodo)
 
 //Update TODO BY ID
 router.patch('/:id',updateTodoById
 )
 
module.exports=router;
 