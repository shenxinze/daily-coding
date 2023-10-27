const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/userControllers')
const { check } = require('express-validator')
const validate = require('../middleware/userValidator')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource')
})

// 登录
router.post('/login', validate.login, userControllers.login)
// 添加用户
router.post('/user', validate.addUser, userControllers.addUser)
// 更新用户
router.put('/user/:id', validate.updateUser, userControllers.updateUser)
// 删除用户
router.delete('/user/:id', userControllers.deleteUser)
// 用户列表
router.get('/user', userControllers.getUsers)

module.exports = router;
