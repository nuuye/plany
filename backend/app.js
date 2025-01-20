const express = require("express");

const app = express();

//import mongoDB
const mongoose = require("mongoose");
//link mongo to our app
mongoose
    .connect("mongodb+srv://mostowfithomas:ubEKRu0zq00KkJJV4@cluster0.j7epx.mongodb.net/")
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch((err) => console.error("Connexion à MongoDB échouée !", err));

//Allow CORS
app.use((req, res, next) => {
    //allow access to our API from anywhere
    res.setHeader("Access-Control-Allow-Origin", "*");
    //add specified headers to each request sent to our API
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    //allow requests with specified methods
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.use(express.json()); //retrieve requests bodies

app.use((req, res) => {
    res.json({ message: "Votre requête a bien été reçue !" });
});

module.exports = app;
