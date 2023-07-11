import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const api_key = process.env.REACT_APP_API_KEY


const getWeather = (lat, lon) => {
    return axios.get(`${baseUrl}lat=${lat}&lon=${lon}&appid=${api_key}`)
}

export default { 
  getWeather: getWeather
}