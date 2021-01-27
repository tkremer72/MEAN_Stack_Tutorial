const Blog = require('../models/blog.model');

exports.create_blog = (req, res, next) => {
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: req.body.date
  });
  //Save the blog to the database
  blog.save()//add a then blog to return the blog Id to use in the frontend
    .then(createdBlog => {
      //console.log(createdBlog);
      res.status(201).json({
        message: 'Blog added successfully!',
        blogId: createdBlog._id
      })
    });
  //console.log(blog);
}

exports.get_blog = (req, res, next) => {
  Blog.findById(req.params.id)
  .then(blog => {
    if(blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({
        message: 'Could not find any blogs matching that id.'
      });
    }
  });
}

exports.get_all_blogs = (req, res, next) => {
  // const blogs = [
  //   {
  //     id: '1003654546ff',
  //     title: 'First server side blog!',
  //     content: 'This is the first blog coming from the backend node.js server.',
  //     author: 'Thomas Kremer',
  //     date: '01/18/20201'
  //   },
  //   {
  //     id: '1003654546fg',
  //     title: 'Second server side blog!',
  //     content: 'This is the second blog coming from the backend node.js server.',
  //     author: 'Thomas Kremer',
  //     date: '01/18/20201'
  //   },
  //   {
  //     id: '1003654546fh',
  //     title: 'Third server side blog!',
  //     content: 'This is the third blog coming from the backend node.js server.',
  //     author: 'Thomas Kremer',
  //     date: '01/18/20201'
  //   },
  //   {
  //     id: '1003654546fi',
  //     title: 'Fourth server side blog!',
  //     content: 'This is the fourth blog coming from the backend node.js server.',
  //     author: 'Thomas Kremer',
  //     date: '01/18/20201'
  //   }
  // ];
  Blog.find().then(documents => {
    //console.log(documents);
    res.status(200).json({
      message: 'Blogs fetched successfully!',
      blogs: documents
    });
  });
}

exports.update_blog = (req, res, next) => {
  const blog = new Blog({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: req.body.date
  });
  Blog.updateOne({_id: req.params.id}, blog)
  .then(result => {
    //console.log(result);
    res.status(200).json({
      message: 'Update successful!'
    })
  });
}

exports.delete_blog = (req, res, next) => {
  // console.log(req.params.id);
  Blog.deleteOne({ _id: req.params.id })
    .then(result => {
      //console.log(result)
      res.status(200).json({
        message: "Post deleted!"
      });
    });
}
