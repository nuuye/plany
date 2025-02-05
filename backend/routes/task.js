const express = require("express");
const router = express.Router();

const taskCtrl = require("../controllers/task");

router.post("/createTask", taskCtrl.createTask);
router.get("/getTasks", taskCtrl.getTasks);
router.put("/modifyTask/:id", taskCtrl.modifyTask);
router.delete("/deleteOneTask/:id", taskCtrl.deleteOneTask);
router.delete("/deleteAll", taskCtrl.deleteAll);

module.exports = router;
