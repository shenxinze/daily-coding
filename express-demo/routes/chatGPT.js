const express = require('express')
const router = express.Router()
const chatGPTControllers = require('../controllers/chatGPTControllers')

// 回复
router.post('/conversation', chatGPTControllers.conversation)

module.exports = router