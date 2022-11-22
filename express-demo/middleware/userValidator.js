const { body } = require('express-validator')
const validate = require('../utils/errorBack')

module.exports = {
  login: validate([
    body('username').notEmpty().withMessage('用户名不能为空').bail(),
    body('password').notEmpty().withMessage('密码不能为空').bail().isLength({ min: 3 }).withMessage('密码长度不能小于3').bail()
  ]),
  addUser: validate([
    body('username').notEmpty().withMessage('用户名不能为空').bail(),
    body('password').notEmpty().withMessage('密码不能为空').bail().isLength({ min: 3 }).withMessage('密码长度不能小于3').bail(),
    body('age').notEmpty().withMessage('年龄不能为空').bail().isInt({ min: 0, max: 120 }).withMessage('年龄不合法').bail(),
    body('avatar').notEmpty().withMessage('头像不能为空').bail()
  ]),
  updateUser: validate([
    body('username').notEmpty().withMessage('用户名不能为空').bail(),
    body('password').notEmpty().withMessage('密码不能为空').bail().isLength({ min: 3 }).withMessage('密码长度不能小于3').bail(),
    body('age').notEmpty().withMessage('年龄不能为空').bail().isInt({ min: 0, max: 120 }).withMessage('年龄不合法').bail(),
    body('avatar').notEmpty().withMessage('头像不能为空').bail()
  ])
}