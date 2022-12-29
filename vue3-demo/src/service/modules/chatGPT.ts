import request from '../request'

export default {
  listModels: () => request.get('/listModels'),
  createImg: (params = {}) => request.post('/createImg', params),
  completion: (params = {}) => request.post('/completion', params),
}