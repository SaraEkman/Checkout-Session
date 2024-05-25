var express = require('express');
var router = express.Router();
const { getUsers, getCustomers } = require("../resources/users.controllers");
const { loggedIn } = require("../middlewares/loggedIn");

router.get("/", loggedIn, getUsers);
router.get("/customers", loggedIn, getCustomers);

module.exports = router;
