
const express = require("express");
const { userSearch } = require("../controllers/User");
const { auth } = require("../middlewares/auth");

const router = express.Router();



// routes for user Search
router.get("/searchUser", auth,userSearch);

module.exports = router;