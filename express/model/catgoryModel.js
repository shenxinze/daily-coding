const mongoose = require('mongoose')
const schema = mongoose.Schema
const articleType = {
  name: String
}
const articleModel = mongoose.model('article', new schema(articleType))

module.exports = articleModel