const Task = require("../models/task");

exports.createTask = (req, res, next) => {
    console.log("createTask req body: ", req.body);
    delete req.body._id;
    delete req.body._userId;
    const task = new Task({ ...req.body, userId: req.auth.userId });
    task.save()
        .then(() => res.status(201).json(task))
        .catch((error) => res.status(400).json({ error }));
};

exports.getTasks = (req, res, next) => {
    Task.find({})
        .then((tasks) => res.status(200).json(tasks))
        .catch((error) => res.status(500).json({ error }));
};

exports.deleteOneTask = (req, res, next) => {
    Task.findOne({ _id: req.params.id })
        .then((task) => {
            if (task.userId != req.auth.userId) {
                res.status(401).json({ message: "Not authorized" });
            } else {
                Task.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: "Task deleted!" }))
                    .catch((error) => res.status(401).json({ error }));
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.deleteAll = (req, res, next) => {
    Task.deleteMany({})
        .then(() => res.status(200).json({ message: "All Tasks deleted!" }))
        .catch((error) => res.status(400).json({ error }));
};

exports.modifyTask = (req, res, next) => {
    delete req.body.userId;
    Task.findOne({ _id: req.params.id })
        .then((task) => {
            if (task.userId != req.auth.userId) {
                res.status(401).json({ message: "Not authorized" });
            } else {
                Task.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
                    .then(() => res.status(200).json({ message: "Task modified!" }))
                    .catch((error) => res.status(401).json({ error }));
            }
        })
        .catch((error) => res.status(400).json({ error }));
};
