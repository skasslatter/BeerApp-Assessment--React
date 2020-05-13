import Axios from 'axios'


export const getBreweries = (url, breweries, resolve, reject) => {
  Axios.get(url)
    .then(response => {
      const retrivedBreweries = breweries.concat(response.data.results)
      if (response.data.next !== null) {
        getBreweries(response.data.next, retrivedBreweries, resolve, reject)
      } else {
        resolve(retrivedBreweries)
      }
    })
    .catch(error => {
      console.log(error)
      reject('Something wrong. Please refresh the page and try again.')
    })
}