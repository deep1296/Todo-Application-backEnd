
const mongoose = require("mongoose");
module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://deep1296:deep1296@cluster0.rxliw.mongodb.net/todos_data"
  );
}