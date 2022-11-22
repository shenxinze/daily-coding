const catgoryService = require('../services/catgoryService')

const resSuccess = (data = null, msg = '', code = 0, success = true) => {
  const obj = {
    code,
    success,
    msg
  }
  return data ? Object.assign({}, obj, {data}) : obj
}

const catgoryControllers = {
  addCatgory: async (req, res) => {
    const { name } = req.body
    await catgoryService.addCatgory(name)
    res.send(resSuccess())
  },
  updateCatgory: async (req, res) => {
    const { name } = req.body
    const id = req.params.id
    await catgoryService.updateCatgory(id, name)
    res.send(resSuccess())
  },
  deleteCatgory: async (req, res) => {
    const id = req.params.id
    await catgoryService.deleteCatgory(id)
    res.send(resSuccess())
  },
  getCatgory: async (req, res) => {
    const data = await catgoryService.getCatgory()
    res.send(resSuccess(data))
  }
}

module.exports = catgoryControllers