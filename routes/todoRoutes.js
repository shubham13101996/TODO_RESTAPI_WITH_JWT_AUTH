const express = require("express");
const router = express.Router();
const {
  getTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getTodos).post(createTodo);
router.route("/:id").get(getTodo).put(updateTodo).delete(deleteTodo);

module.exports = router;
