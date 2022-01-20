import apiCore from './apiCore'

const movingDeclarationApi = {
  getAll: () => {
    const url = '/admin'
    return apiCore.get(url)
  },
}

export default movingDeclarationApi
