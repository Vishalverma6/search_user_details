const express = require("express");
const { login, signup } = require("../controllers/Auth");

const router = express.Router();



// routes for login , signup 

// routes for login
router.post("/login",login);

// routes for signup
router.post("/signup",signup);



module.exports = router;