import { appStore } from '@/stores/store'

export const fetchWeatherData = async (city = 'Montreal') => {
  const data = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=f59a323ce8ad472a9dd213908231908&q=${city}`,
  )
  const response = await data.json()
  const location = `${response.location.name}, ${response.location.country}`
  const currTemp = `${response.current.temp_c}`
  const highTemp = `${response.forecast.forecastday[0].day.maxtemp_c}`
  const lowTemp = `${response.forecast.forecastday[0].day.mintemp_c}`
  const condition = `${response.current.condition.text}`
  const cleanedData = [location, currTemp, condition, highTemp, lowTemp]
  return cleanedData
}
