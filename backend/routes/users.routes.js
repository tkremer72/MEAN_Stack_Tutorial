const express = require('express');

const confirmAuth = require("../middleware/verify-auth");
const getFile = require("../middleware/file");

const usersControl = require('../controllers/users.controller');

const router = express.Router();
router.post('/create', confirmAuth, getFile, usersControl.create_user);
router.get('/', usersControl.get_all_users);
//router.get('/:id', usersControl.get_profile);
router.get('/:id', usersControl.get_user);
router.put('/:id', confirmAuth, getFile, usersControl.update_user)
module.exports = router;
