const express = require("express");

const Todo = require("../models/todoModel");

const authenticate = require("../middlewares/authenticate");
const authorise = require("../middlewares/authorise");

const router = express.Router();

///----------post request to create a todo by a user----------

router.post("", async (req, res) => {
  try {
    // console.log(temp);
    let temp = req.body.subtasks;

    const todo = await Todo.create({
      user_id: req.body.user_id,
      title: req.body.title,
      description: req.body.description,
      subtasks: temp,
      status: req.body.status,
      tags: {
        official: req.body.tags.official,
        personal: req.body.tags.personal,
        others: req.body.tags.others,
      },
      date: req.body.date,
    });
    return res.status(200).json(todo);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
});

//----------------------get request by user id--------

router.get("/:id", async (req, res) => {
  try {
    ///------if user put todo id in url then it will show only that todo
    //-------------otherwise it will show all todos of that user with id----------
    const todo = await Todo.find({ user_id: { $eq: req.params.id } })
      .lean()
      .exec();
    const todo1 = await Todo.find({ _id: { $eq: req.params.id } })
      .lean()
      .exec();

    if (todo.length == 0) {
      console.log(todo1);
      return res.status(200).json(todo1);
    } else {
      console.log(todo);
      return res.status(200).json(todo);
    }
    // return res.send(todo);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

///------------------------------update request using todo id--------------------//

router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // const todo = await Todo.findByIdAndUpdate( req.params.id  ).lean().exec();
    console.log(todo);
    return res.status(200).json(todo);

    // return res.send(todo);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//-----------------delete request using todo id---------------------//
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id).lean().exec();

    console.log(todo);
    return res.status(200).json(todo);

    // return res.send(todo);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//----------------get request only user get authenticated---------------------//

router.get("", authenticate, async (req, res) => {
  try {
    // console.log(req.params.id);

    const todo = await Todo.find().lean().exec();
    console.log(todo);
    return res.send(todo);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
