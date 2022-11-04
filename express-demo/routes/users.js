const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/userControllers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource')
})

// 登录
router.post('/login', userControllers.login)
// 添加用户
router.post('/user', userControllers.addUser)
// 更新用户
router.put('/user/:id', userControllers.updateUser)
// 删除用户
router.delete('/user/:id', userControllers.deleteUser)
// 用户列表
router.get('/user', userControllers.getUsers)

module.exports = router;
