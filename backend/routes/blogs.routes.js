const express = require('express');

const blogsControl = require('../controllers/blogs.controller');

const router = express.Router();

router.post('', blogsControl.create_blog);

router.get('/:id', blogsControl.get_blog);

router.get('', blogsControl.get_all_blogs);

router.put('/:id', blogsControl.update_blog);

router.delete('/:id', blogsControl.delete_blog);

module.exports = router;
