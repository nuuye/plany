const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
    //on commence par hasher le password reçu
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
        });
        user.save()
            .then(() => res.status(201).json({ message: "Utilisateur crée !" }))
            .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({error}));
};

exports.login = (req, res, next) => {};
