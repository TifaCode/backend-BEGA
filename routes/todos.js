var express = require("express");
var router = express.Router();
const authentication = require("../middleware/authentification");
const { addTodo } = require("../controller/todoController");

router.post("/addtodo", addTodo);

module.exports = router;
