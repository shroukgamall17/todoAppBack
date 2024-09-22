const fs = require("fs");
const todosModel = require("../models/todos");

const getAllTodos = async (req, res) => {
  try {
    let todos = await todosModel.find().populate('userId');
    res.status(200).json({ data: todos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTodoById = async (req, res) => {
  let { id } = req.params;

  try {
    let todo = await todosModel.findById(id);
    if (todo) {
      res.status(200).json({ data: todo });
    }
  } catch{
    res.json({ message: "there are no todo with this id" });
  }
};

const createNewTodo = async (req, res,next) => {
  let newTodo = req.body;
  newTodo.userId = req.id

  try {
    let insertedTodo = await todosModel.create(newTodo);
    res.status(201).json({ message: "created", data: insertedTodo });
  } catch (err) {
    next(err);
  }
};

const updateTodoById = async (req, res) => {
  let {id} = req.params
 let {title} =req.body
 try{
let updatedTodo = await todosModel.findByIdAndUpdate(id , {title},{new:true})
res.status(200).json({message:'updated successfully', data:updatedTodo })

}catch(err) {
    res.status(400).json({ message: err.message });
 }
};
module.exports = { getAllTodos, getTodoById, createNewTodo, updateTodoById };
