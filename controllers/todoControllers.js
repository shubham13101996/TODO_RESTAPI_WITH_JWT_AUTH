const asyncHandler = require("express-async-handler");
const Todo = require("../models/todoModel");
//@desc Get all todos
//@route GET /api/todos
//@access private
const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user_id: req.user.id });
  res.status(200).json(todos);
});

//@desc Create New todos
//@route POST /api/todos
//@access private
const createTodo = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { title, description, status } = req.body;
  if (!title || !description || !status) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const todo = await Todo.create({
    title,
    description,
    status,
    user_id: req.user.id,
  });

  res.status(201).json(todo);
});

//@desc Get todo
//@route GET /api/todos/:id
//@access private
const getTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }
  res.status(200).json(todo);
});

//@desc Update todo
//@route PUT /api/todos/:id
//@access private
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }

  if (todo.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User don't have permission to update other user todo list"
    );
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTodo);
});

//@desc Delete todo
//@route DELETE /api/todos/:id
//@access private
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }
  if (todo.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User don't have permission to delete other user todo list"
    );
  }
  await todo.deleteOne({ _id: req.params.id });
  res.status(200).json(todo);
});

module.exports = {
  getTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};
