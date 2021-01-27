const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const Blog = require('./models/blog.model');

const app = express();
//Connect to Mongo DB
mongoose.connect(
  `mongodb+srv://tbone7243:Daddykjune1!@cluster0.lebuw.mongodb.net/MEAN_Tutorial?retryWrites=true&w=majority`,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
).then(() => {
  console.log('Connected to Mongo DB!')
}).catch(() => {
  console.log('Connection failed!')
})
/* app.use((req, res, next) => {
  console.log('First middleware!')
  next();
}); */

//use the body parser before incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Setting the CORS policy manually
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, PATCH, POST, PUT , DELETE, OPTIONS'
  );
  next();
});

app.use(cors());

app.post('/api/blogs', (req, res, next) => {
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
});

app.get('/api/blogs', (req, res, next) => {
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
});

app.delete('/api/blogs/:id', (req, res, next) => {
  // console.log(req.params.id);
  Blog.deleteOne({ _id: req.params.id })
    .then(result => {
      //console.log(result)
      res.status(200).json({
        message: "Post deleted!"
      });
    });
});

module.exports = app;
