const Task = require("../models/task");

exports.createTask = (req, res, next) => {
    console.log(req.body);
    delete req.body._id;
    const task = new Task(req.body);
    task.save()
        .then(() => res.status(201).json({ message: "Task saved!" }))
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteOneTask = (req, res, next) => {
    Task.deleteOne({ _id: req.params._id })
        .then(() => res.status(200).json({ message: "Task deleted!" }))
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteAll = (req, res, next) => {
    Task.deleteMany({})
        .then(() => res.status(200).json({ message: "All Tasks deleted!" }))
        .catch((error) => res.status(400).json({ error }));
};

exports.modifyTask = (req, res, next) => {
    Task.updateOne({ _id: req.params._id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Task modified!" }))
        .catch((error) => res.status(400).json({ error }));
};
