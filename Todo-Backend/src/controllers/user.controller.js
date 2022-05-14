const express = require("express");

const User = require("../models/user.model");

const router = express.Router();

router.get("", async (req, res) => {
    try {
      const user = await User.find()
        .lean()
        .exec();
      console.log(user);
      return res.send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
router.get("/:name", async (req, res) => {
    try {
      // console.log(req.params.id);
      const user = await User.find({ name: { $eq: req.params.name } })
        .lean()
        .exec();
      console.log(user);
      return res.send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

module.exports = router;
