const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
    //on commence par hasher le password reçu
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
            });
            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur crée !" }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                bcrypt.compare(req.body.password, user.password).then((result) => {
                    if (result) {
                        res.status(200).json({
                            userId: user._id,
                            token: "TOKEN",
                        });
                    } else {
                        res.status(403).json({ message: "Incorrect credentials" });
                    }
                });
            } else {
                res.status(404).json({ message: "Incorrect credentials" });
            }
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

exports.emailCheck = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                res.status(200).json({ message: "Utilisateur trouvé !" });
            } else {
                res.status(204).json({ message: "Utilisateur introuvable" });
            }
        })
        .catch((err) => {
            res.status(500).json({ err });
        });
};
