const express = require('express')
const router = express.Router()
const catgoryControllers = require('../controllers/catgoryControllers')

// 添加类别
router.post('/catgory', catgoryControllers.addCatgory)
// 修改类别
router.put('/catgory/:id', catgoryControllers.updateCatgory)
// 删除类别
router.delete('/catgory/:id', catgoryControllers.deleteCatgory)
// 类别列表
router.get('/catgory', catgoryControllers.getCatgory)

module.exports = router