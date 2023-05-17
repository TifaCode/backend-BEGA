var express = require("express");
var router = express.Router();
const authentication = require("../middleware/authentification");
const {
  addTodo,
  updateTodo,
  deleteTodo,
  getAllTodo,
} = require("../controller/todoController");

router.post("/addtodo", addTodo);
router.put("/updatetodo", updateTodo);
router.delete("/deletetodo", deleteTodo);
router.get("/getalltodo/:eventId", getAllTodo);

module.exports = router;
