const userService = require('../services/userService')

const resSuccess = (data = null, msg = '', code = 0, success = true) => {
  const obj = {
    code,
    success,
    msg
  }
  return data ? Object.assign({}, obj, {data}) : obj
}

const resFail = (msg='请求失败，请稍后重试', code = 1, success = false) => {
  return {
    code,
    success,
    msg
  }
}

const userControllers = {
  login: async (req, res) => {
    const { username, password } = req.body
    const data = await userService.login(username, password)
    if(data.length === 0){
      res.send(resFail('用户名或密码错误'))
    }else{
      res.send(resSuccess())
    }
  },
  addUser: async (req, res) => {
    const { username, password, age } = req.body
    const avatar = req.file ? `/${req.file.filename}` : '/default.jpg'
    await userService.addUser(username, password, age, avatar)
    res.send(resSuccess())
  },
  updateUser: (req, res) => {
    const { username, password, age } = req.body
    const id = req.params.id
    res.send(resSuccess())
  },
  deleteUser: (req, res) => {
    const id = req.params.id
    res.send(resSuccess())
  },
  getUsers: (req, res) => {
    const { page, size } = req.query
    res.send(resSuccess([1,2,3,4]))
  }
}

module.exports = userControllers