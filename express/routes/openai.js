const express = require('express')
const router = express.Router()
const openaiControllers = require('../controllers/openaiControllers')

// 可用模型列表
router.get('/listModels', openaiControllers.listModels)
// 生成图片
router.post('/createImg', openaiControllers.createImg)
// 对话
router.post('/completion', openaiControllers.completion)

module.exports = router