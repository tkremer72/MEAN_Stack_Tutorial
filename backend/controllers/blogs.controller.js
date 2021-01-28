const Blog = require('../models/blog.model');


exports.create_blog = (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");

  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: req.body.date,
    imagePath: url + "/images/" + req.file.filename
  });
  //Save the blog to the database
  blog.save()//add a then blog to return the blog Id to use in the frontend
    .then(createdBlog => {
      //console.log(createdBlog);
      res.status(201).json({
        message: 'Blog added successfully!',
        blog: {
          ...createdBlog,
          id: createdBlog._id/* ,
          title: createdBlog.title,
          content: createdBlog.content,
          author: createdBlog.author,
          date: createdBlog.date,
          imagePath: createdBlog.imagePath */
        }
      });
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
  //Add the query parameters for paginator
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const blogQuery = Blog.find();
  let fetchedBlogs;
  if(pageSize && currentPage) {
    blogQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  blogQuery.then(documents => {
    fetchedBlogs = documents;
    //console.log(documents);
   return Blog.estimatedDocumentCount();
  }).then(count => {
    res.status(200).json({
      message: 'Blogs fetched successfully!',
      blogs: fetchedBlogs,
      maxBlogs: count
    });
  });
}

exports.update_blog = (req, res, next) => {
  // console.log(req.file);
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const blog = new Blog({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: req.body.date,
    imagePath: imagePath
  });
  //console.log(blog);
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
