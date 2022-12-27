import axios from 'axios'
import { ElMessage } from 'element-plus'

declare module 'axios' {
  interface AxiosResponse<T = any> {
    [key: string]: any
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance
}

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 8000
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    if (response.status == 200) {
      const data = response.data
      if (data.code === 0 && data.success) {
        return data.data
      } else {
        return Promise.reject(data.msg)
      }
    } else {
      return Promise.reject(response)
    }
  },
  (error) => {
    if (error.response.status === 500) {
      ElMessage.error(error.message)
    }
    return Promise.reject(error)
  }
)

export default service
