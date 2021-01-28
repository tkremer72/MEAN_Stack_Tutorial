const express = require('express');
const authsControl = require('../controllers/auths.controller');

const router = express.Router();

router.post("/registration", authsControl.user_registration);

router.post("/login", authsControl.user_login);

module.exports = router;
