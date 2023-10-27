const catgoryModel = require('../model/catgoryModel')
const catgoryService = {
  addCatgory: (name) => {
    return catgoryModel.create({name})
  },
  updateCatgory: (_id, name) => {
    return catgoryModel.updateOne({_id}, {name})
  },
  deleteCatgory: (_id) => {
    return catgoryModel.deleteOne({_id})
  },
  getCatgory: () => {
    return catgoryModel.find({}, ['_id', 'name'])
  }
}

module.exports = catgoryService