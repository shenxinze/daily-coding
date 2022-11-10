const mongoose = require('mongoose')
const schema = mongoose.Schema
const articleType = {
  author: String,
  catgory: String,
  content: String,
  poster: String
}
const articleModel = mongoose.model('article', new schema(articleType))

module.exports = articleModel