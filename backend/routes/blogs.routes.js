const express = require('express');
const multer = require('multer');

const blogsControl = require('../controllers/blogs.controller');

const router = express.Router();

//Configure the acceptable types of files
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};
//Configure where and how multer stores uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if(isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

//Create a blog
router.post('',
multer({ storage: storage }).single("image"),
blogsControl.create_blog);

router.get('/:id', blogsControl.get_blog);

router.get('', blogsControl.get_all_blogs);

router.put('/:id',
multer({ storage: storage }).single("image"),
blogsControl.update_blog);

router.delete('/:id', blogsControl.delete_blog);

module.exports = router;
