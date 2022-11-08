const userModel = require('../model/userModel')
const userService = {
  login: (username, password) => {
    return userModel.find({username, password})
  },
  addUser: (username, password, age, avatar) => {
    return userModel.create({
      username,
      password,
      age,
      avatar
    })
  }
}

module.exports = userService