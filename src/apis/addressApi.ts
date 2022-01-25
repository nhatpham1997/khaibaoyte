import axios from 'axios'
// const baseUrl: string = process.env.API_COVID_ENDPOINT

export const addressApi = {
  getAll: () => {
    return axios.get('https://provinces.open-api.vn/api/?depth=3')
  },
}
