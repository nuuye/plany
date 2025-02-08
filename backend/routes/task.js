const express = require("express");
const router = express.Router();

const taskCtrl = require("../controllers/task");
const auth = require("../middlewares/auth");

router.post("/createTask", auth, taskCtrl.createTask);
router.get("/getTasks", auth, taskCtrl.getTasks);
router.put("/modifyTask/:id", auth, taskCtrl.modifyTask);
router.delete("/deleteOneTask/:id", auth, taskCtrl.deleteOneTask);
router.delete("/deleteAll", auth, taskCtrl.deleteAll);

module.exports = router;
