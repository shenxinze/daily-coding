const jwt = require('jsonwebtoken')

const secret = 'shenxinze-test-data'
const JWT = {
  generate(data, outTime){
    return jwt.sign(data, secret, { expiresIn: outTime })
  },
  verify(token){
    try {
      return jwt.verify(token, secret)
    } catch (err) {
      return false
    }
  }
}

module.exports = JWT