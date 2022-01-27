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
export const covidApi = {
  getAll: (encode: string) => {
    return axios.get(
      `https://cuapi.datagalaxy.one/cubejs-api/v1/load?query=${encode}&queryType=multi`,
      {
        headers: {
          authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDMyMDcxMzJ9.yJYIGTOqMDOkrqt6jcYpYuRUJ9LwNOMJBxBT6Ie0bBo',
        },
      }
    )
  },
}
