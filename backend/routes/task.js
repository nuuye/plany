const express = require("express");
const router = express.Router();

const taskCtrl = require("../controllers/task");

router.post("/createTask", taskCtrl.createTask);
router.put("/modifyTask/:id", taskCtrl.modifyTask);
router.delete("/deleteOneTask/:id", taskCtrl.deleteTask);

