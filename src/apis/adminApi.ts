import apiCore from './apiCore'

const adminApi = {
  getAll: () => {
    const url = '/admin'
    return apiCore.get(url)
  },
}

export default adminApi
