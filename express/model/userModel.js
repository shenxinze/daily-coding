const mongoose = require('mongoose')
const schema = mongoose.Schema
const userType = {
  username: String,
  password: String,
  age: Number,
  avatar: String
}
const userModel = mongoose.model('user', new schema(userType))

module.exports = userModel