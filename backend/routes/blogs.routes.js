const express = require('express');

const confirmAuth = require("../middleware/verify-auth");
const getFile = require("../middleware/file");

const blogsControl = require('../controllers/blogs.controller');

const router = express.Router();



//Create a blog
router.post('',
confirmAuth,
getFile,
blogsControl.create_blog);

router.get('/:id', blogsControl.get_blog);

router.get('', blogsControl.get_all_blogs);

//router.get(confirmAuth, 'users-blogs', blogsControl.get_users_blogs);

router.put('/:id',
confirmAuth,
getFile,
blogsControl.update_blog);

router.delete('/:id', confirmAuth, blogsControl.delete_blog);

module.exports = router;
