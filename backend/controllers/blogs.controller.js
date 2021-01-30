const Blog = require('../models/blog.model');

//Create a blog
exports.create_blog = (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");

  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: req.body.date,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
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
    }).catch(error => {
      res.status(500).json({
        message: "Internal server error, failed to create blog.  Please try again later!"
      })
    });
  //console.log(blog);
}
//Get a single blog for the update blog page

exports.get_blog = (req, res, next) => {
  Blog.findById(req.params.id)
  .then(blog => {
    if(blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({
        message: 'Could not find any blogs matching that id, please try again later!'
      });
    }
  }).catch(error => {
    res.status(500).json({
      message: 'Internal server error, unable to fetch blog at this time, please try again later!'
    });
  });
}
//Get all of the blogs in the database
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
  }).catch(error => {
    res.status(500).json({
      message: 'Internal server error, unable to fetch blogs at this time, please try again later!'
    });
  });
}

//Get all of the blogs by a user

// exports.get_users_blogs = (req, res, next) => {
//    // const blogs = [
//   //   {
//   //     id: '1003654546ff',
//   //     title: 'First server side blog!',
//   //     content: 'This is the first blog coming from the backend node.js server.',
//   //     author: 'Thomas Kremer',
//   //     date: '01/18/20201'
//   //   },
//   //   {
//   //     id: '1003654546fg',
//   //     title: 'Second server side blog!',
//   //     content: 'This is the second blog coming from the backend node.js server.',
//   //     author: 'Thomas Kremer',
//   //     date: '01/18/20201'
//   //   },
//   //   {
//   //     id: '1003654546fh',
//   //     title: 'Third server side blog!',
//   //     content: 'This is the third blog coming from the backend node.js server.',
//   //     author: 'Thomas Kremer',
//   //     date: '01/18/20201'
//   //   },
//   //   {
//   //     id: '1003654546fi',
//   //     title: 'Fourth server side blog!',
//   //     content: 'This is the fourth blog coming from the backend node.js server.',
//   //     author: 'Thomas Kremer',
//   //     date: '01/18/20201'
//   //   }
//   // ];
//   //Add the query parameters for paginator
//   const pageSize = +req.query.pagesize;
//   const currentPage = +req.query.page;
//   const blogQuery = Blog.find({ id: userData.userId });
//   let fetchedBlogs;
//   if(pageSize && currentPage) {
//     blogQuery
//     .skip(pageSize * (currentPage - 1))
//     .limit(pageSize);
//   }
//   blogQuery.then(documents => {
//     fetchedBlogs = documents;
//     //console.log(documents);
//    return Blog.estimatedDocumentCount();
//   }).then(count => {
//     res.status(200).json({
//       message: 'Blogs fetched successfully!',
//       blogs: fetchedBlogs,
//       maxBlogs: count
//     });
//   });
// }

//Update a blog
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
    imagePath: imagePath,
    creator: req.userData.userId
  });
  //console.log(blog);
  Blog.updateOne({_id: req.params.id, creator: req.userData.userId }, blog)
  .then(result => {
    //console.log(result);
    if(result.n > 0) {
      res.status(200).json({
      message: 'Your blog update was successful!'
    });
    } else {
      res.status(401).json({
        message: 'You are not authorized to perform this task! Please log in and try again!'
      });
    }
  }).catch(error => {
    res.status(500).json({
      message: 'Internal server error, could not process your request at this time.  Please try again later!'
    });
  });
}
//Delete a blog
exports.delete_blog = (req, res, next) => {
  // console.log(req.params.id);
  Blog.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      if(result.n > 0) {
        res.status(200).json({
        message: "Blog was successfully deleted!"
      });
      } else {
        res.status(401).json({
          message: 'You are not authorized to perform this task, please log in and try again!'
        });
      }
      //console.log(result)
    }).catch(error => {
      res.status(500).json({
        message: 'Internal server error, could not process your request.  Blog was not deleted.  Please try again later!'
      });
    });
}
