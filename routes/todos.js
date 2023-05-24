var express = require("express");
var router = express.Router();
const authentication = require("../middleware/authentification");
const {
  addTodo,
  updateTodo,
  deleteTodo,
  getAllTodo,
} = require("../controller/todoController");

router.post("/addtodo", addTodo); //req.body.description, req.body.taskName, req.body.eventId;
router.post("/updatetodo", updateTodo); //req.body.isDone, req.body.userId, req.body.todoId;
router.delete("/deletetodo", deleteTodo); //req.body.todoId;
router.get("/getalltodo/:eventId", getAllTodo); //req.params.eventId;

module.exports = router;
