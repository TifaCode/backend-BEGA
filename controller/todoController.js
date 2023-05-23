const Todo = require("../models/todos");
const { Event } = require("../models/events");
const { get } = require("mongoose");

const addTodo = async (req, res) => {
  const { description, taskName, eventId } = req.body;
  const newTodo = new Todo({
    description,
    taskName,
    isDone: false,
  });
  try {
    let saveTodo = newTodo;
    await saveTodo.save();
    await Event.updateOne(
      { _id: eventId },
      {
        $addToSet: {
          todoId: { $each: [saveTodo._id] },
        },
      }
    );
    res.json({ result: true, saveTodo });
  } catch (e) {
    res.json({ result: false, error: "impossible de creer une Todo ok ?" });
  }
};

const getAllTodo = async (req, res) => {
  const { eventId } = req.params;
  const getAllTodo = await Event.findById(eventId).populate("todoId");

  try {
    res.json({ result: true, getAllTodo });
  } catch (e) {
    res.json({ result: false, error: "impossible d'afficher les todos" });
  }
};

const updateTodo = async (req, res) => {
  const { isDone, userId, todoId } = req.body;
  try {
    await Todo.updateOne(
      { _id: todoId },
      {
        isDone,
        $addToSet: {
          userId: { $each: [userId] },
        },
      }
    );
    res.json({ result: true, error: "To Do is updated" });
  } catch (e) {
    res.json({ result: false, error: "parle a ma main ok !?" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const deleteTodo = await Todo.deleteOne({ _id: req.body.todoId });
    if (deleteTodo.deletedCount > 0) {
      res.json({ result: true, error: "To Do is deleted" });
    } else {
      res.json({ result: false, error: "impossible de supprimer" });
    }
  } catch (e) {
    res.json({ result: false, error: "impossible no no et no" });
  }
};

module.exports = { addTodo, updateTodo, deleteTodo, getAllTodo };
