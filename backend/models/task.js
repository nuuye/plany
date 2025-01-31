const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    description: { type: String, required: false },
    color: { type: String, required: false },
    userId: { type: String, required: true },
});

module.exports = mongoose.model("Task", taskSchema);
