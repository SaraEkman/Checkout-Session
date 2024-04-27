var express = require('express');
var router = express.Router();
const { getUsers } = require("../resources/users.controllers");
const { loggedIn } = require("../middlewares/loggedIn");

router.get("/", loggedIn, getUsers);

module.exports = router;
