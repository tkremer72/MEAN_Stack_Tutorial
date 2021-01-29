//Bring in the path package to allow access to files and folders
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auths.routes');
const blogRoutes = require('./routes/blogs.routes');
const userRoutes = require('./routes/users.routes')

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
//Allow access to the backend images folder
app.use("/images", express.static(path.join("backend/images")));

//Setting the CORS policy manually
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, PATCH, POST, PUT , DELETE, OPTIONS'
  );
  next();
});

app.use(cors());

app.use('/api/blogs', blogRoutes);
app.use('/api/auths', authRoutes);
app.use('/api/users', userRoutes);

//app.post();

//app.put();

//app.get();

//app.get();

//app.delete();

module.exports = app;
