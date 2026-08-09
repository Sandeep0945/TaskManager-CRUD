const { Router } = require("express");
const router = Router();

const { signup , login} = require("../Controllers/authcontroller.js");

router.post("/login",login);
router.post("/signup",signup);

module.exports = router