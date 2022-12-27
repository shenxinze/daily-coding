const express = require('express')
const router = express.Router()
const openaiControllers = require('../controllers/openaiControllers')

// 生成图片
router.post('/createImg', openaiControllers.createImg)
// 对话
router.post('/completion', openaiControllers.completion)

module.exports = router