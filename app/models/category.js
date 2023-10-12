const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema({
  name: string,
});
module.exports = mongoose.model("Category", categorySchema);