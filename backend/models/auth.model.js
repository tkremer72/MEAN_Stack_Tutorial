const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
  user_email: { type: String, required: true },
  user_password: { type: String, required: true },
  is_admin: { type: Boolean, required: false, default: false },
  is_deleted: { type: Boolean, required: false, default: false }
});

module.exports = mongoose.model('Auth', authSchema);

