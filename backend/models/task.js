const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    userId: { type: String, required: true },
    criticity: { type: Number, required: true },
});

module.exports = mongoose.model("Task", taskSchema);