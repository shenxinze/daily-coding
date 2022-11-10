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
  },
  updateUser: (_id, username, password, age, avatar) => {
    return userModel.updateOne({_id}, {
      username,
      password,
      age,
      avatar
    })
  },
  deleteUser: (_id) => {
    return userModel.deleteOne({_id})
  },
  getUsers: (page, limit) => {
    return userModel.find({}, ['username', 'age', 'avatar']).sort({age: 1}).skip((page - 1) * limit).limit(limit)
  }
}

module.exports = userService