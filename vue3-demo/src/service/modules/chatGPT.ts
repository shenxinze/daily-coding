import request from '../request'

export default {
  createImg: (params = {}) => request.post('/createImg', params),
  translate: (params = {}) => request.post('/conversation', params),
  completion: (params = {}) => request.post('/completion', params),
}