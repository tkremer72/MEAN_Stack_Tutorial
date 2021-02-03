const User = require('../models/user.model');

//Create a user profile
exports.create_user = (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");

  const user = new User({
    _id: req.userData.userId,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    user_email: req.userData.user_email,
    user_name: req.body.user_name,
    user_street: req.body.user_street,
    user_city: req.body.user_city,
    user_state: req.body.user_state,
    user_zip: req.body.user_zip,
    user_phone: req.body.user_phone,
    user_mobile: req.body.user_mobile,
    is_admin: false,
    is_deleted: false,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  user.save()
  .then(createdUser => {
    res.status(201).json({
      message: 'User profile has been successfully created!',
      user:  {
        ...createdUser,
        id: createdUser._id
      }
    })
  }).catch(error => {
    res.status(500).json({
      message: 'There has been an internal server error, could not create user profile!'
    })
  })
}
//Get a user profile by the creator object
exports.get_profile = (req, res, next) => {
  User.findById(req.params.id)
  .then(user => {
    if(user) {
      res.status(200).json(user)
      //console.log(user);
    } else {
      res.status(404).json({
        message: 'Could not find any users with that id, please check your information and try again.'
      })
    }
  }).catch(error => {
    res.status(500).json({
      message: 'There has been an internal server error, please try again later!'
    })
  })
}
//Get a single user by the id
exports.get_user = (req, res, next) => {
  User.findById(req.params.id)
  .then(user => {
    if(user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: 'Could not find any users matching that id, please try again later!'
      });
    }
  }).catch(error => {
    res.status(500).json({
      message: 'Internal server error, unable to fetch user at this time, please try again later!'
    });
  });
}
//Get all of the users in the database, this will be for the admin user only and moved to another route
exports.get_all_users = (req, res, next) => {
  // const users = [
  //   {
  //     id: '1003654546ff',
  //     first_name: 'First server side user!',
  //     last_name: 'This is the first user coming from the backend node.js server.',
  //     user_name: 'Thomas Kremer',
  //     user_street: '01/18/20201'
  //   },
  //   {
  //     id: '1003654546fg',
  //     first_name: 'Second server side user!',
  //     last_name: 'This is the second user coming from the backend node.js server.',
  //     user_name: 'Thomas Kremer',
  //     user_street: '01/18/20201'
  //   },
  //   {
  //     id: '1003654546fh',
  //     first_name: 'Third server side user!',
  //     last_name: 'This is the third user coming from the backend node.js server.',
  //     user_name: 'Thomas Kremer',
  //     user_street: '01/18/20201'
  //   },
  //   {
  //     id: '1003654546fi',
  //     first_name: 'Fourth server side user!',
  //     last_name: 'This is the fourth user coming from the backend node.js server.',
  //     user_name: 'Thomas Kremer',
  //     user_street: '01/18/20201'
  //   }
  // ];
  //Add the query parameters for paginator
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const userQuery = User.find();
  let fetchedUsers;
  if(pageSize && currentPage) {
    userQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  userQuery.then(documents => {
    fetchedUsers = documents;
    //console.log(documents);
   return User.estimatedDocumentCount();
  }).then(count => {
    res.status(200).json({
      message: 'Users fetched successfully!',
      users: fetchedUsers,
      maxUsers: count
    });
  }).catch(error => {
    res.status(500).json({
      message: 'Internal server error, unable to fetch users at this time, please try again later!'
    });
  });
}
//Update a users information, this will be for the edit user page.
exports.update_user = (req, res, next) => {
  // console.log(req.file);
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const user = new User({
    _id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    user_name: req.body.user_name,
    user_street: req.body.user_street,
    user_city: req.body.user_city,
    user_state: req.body.user_state,
    user_zip: req.body.user_zip,
    user_phone: req.body.user_phone,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  //console.log(user);
  User.updateOne({_id: req.params.id, creator: req.userData.userId }, user)
  .then(result => {
    //console.log(result);
    if(result.n > 0) {
      res.status(200).json({
      message: 'Your user update was successful!'
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

