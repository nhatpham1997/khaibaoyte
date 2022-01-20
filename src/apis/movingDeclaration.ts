import apiCore from './apiCore'

const movingDeclarationApi = {
  getAll: () => {
    const url = '/moving_declaration'
    return apiCore.get(url)
  },
}

export default movingDeclarationApi
