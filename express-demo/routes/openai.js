const express = require('express')
const router = express.Router()
const openaiControllers = require('../controllers/openaiControllers')

// 生成图片
router.post('/createImg', openaiControllers.createImg)

module.exports = router