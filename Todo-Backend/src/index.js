require("dotenv").config();
const express = require("express");
const connect = require("./configs/db");
const cors = require("cors");
const userController = require("./controllers/user.controller");
const todoController = require("./controllers/todoController");
const { register, login } = require("./controllers/auth.controller");
const { body } = require("express-validator");


//-------------------//------------------------------//----------//

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userController);
app.use("/todos", todoController);

//-------------------//---------------------------//---------------//

app.post("/register", body("email").notEmpty(), register);
app.post("/login", login);

app.listen(process.env.PORT || 1296, async function () {
  try {
    await connect();
    console.log("app is listening on port 5500");
  } catch (err) {
    console.log(err.message);
  }
});
