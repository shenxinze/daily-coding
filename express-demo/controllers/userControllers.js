const resSuccess = (data, msg = '', code = 0, success = true) => {
  const obj = {
    code,
    success,
    msg
  }
  return data ? Object.assign({}, obj, {data}) : obj
}
const userControllers = {
  login: (req, res) => {
    const { username, password } = req.body
    res.send(resSuccess())
  },
  addUser: (req, res) => {
    const { username, password, age } = req.body
    res.send(resSuccess())
  },
  updateUser: (req, res) => {
    const { username, password, age } = req.body
    const id = req.params.id
    console.log(username, password, age, id)
    res.send(resSuccess())
  },
  deleteUser: (req, res) => {
    const id = req.params.id
    res.send(resSuccess())
  },
  getUsers: (req, res) => {
    const { page, size } = req.query
    res.send(resSuccess([1,2,3,4]))
  }
}

module.exports = userControllers