import axios from 'axios'

const apiCore = axios.create({
  baseURL: 'https://dbkhaibaoyte.herokuapp.com',
  headers: {
    'content-type': 'application/json',
  },
})

apiCore.interceptors.request.use(async (config) => {
  return config
})
apiCore.interceptors.response.use(
  async (response) => {
    if (response && response.data) {
      return response.data
    }
    return response
  },
  (error) => {
    throw error
  }
)

export default apiCore
