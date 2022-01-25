import apiCore from './apiCore'

const userApi = {
  getAll: () => {
    const url = '/user'
    return apiCore.get(url)
  },
}

export default userApi
