import axios from 'axios'
// const baseUrl: string = process.env.API_COVID_ENDPOINT

export interface ILocation {
  name: string
  death: number
  treating: number
  cases: number
  recovered: number
  casesToday: number
}

export const locationApi = {
  getAll: () => {
    return axios.get(
      'https://api.apify.com/v2/key-value-stores/EaCBL1JNntjR3EakU/records/LATEST?disableRedirect=true'
    )
  },
}
