const { Router} = require("express");
const router = Router();

const {createTask , readTask , updateTask , deleteTask } = require("../Controllers/taskcontroller.js");

router.post("/create",createTask);
router.get("/read",readTask);
router.put("/update/:id",updateTask);
router.delete("/delete/:id",deleteTask);

module.exports = router