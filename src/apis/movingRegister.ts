import apiCore from './apiCore'

const movingRegisterApi = {
  getAll: () => {
    const url = '/user'
    return apiCore.get(url)
  },
  edit: (id: number, value: string) => {
    const url = `/posts/${id}`
    return apiCore.put(url, value)
  },
}

export default movingRegisterApi
