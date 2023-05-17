const Todo = require("../models/todos");

const addTodo = async (req, res) => {
  const { description, taskName } = req.body;
  console.log(req.body);
  const newTodo = new Todo({
    description,
    taskName,
  });
  try {
    const saveTodo = newTodo;
    await saveTodo.save();
    res.json({ result: true, saveTodo });
  } catch (e) {
    res.json({ error: "impossible de creer une Todo ok ?" });
  }
};

module.exports = { addTodo };
