<script setup>
import { fetchWeatherData } from '@/services/weather'
import { ref, onMounted } from 'vue'

const weatherData = ref([])

onMounted(async () => {
  weatherData.value = await fetchWeatherData()
})

const months = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  10: 'October',
  11: 'November',
  12: 'December',
}
const currentDate = new Date()
const year = currentDate.getFullYear()
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
const day = currentDate.getDate().toString().padStart(2, '0')

const formattedDate = ref(`${months[month]} ${day}, ${year}`)
const changeCity = ref(false)
const cityInput = ref('')
const showEditForm = () => {
  changeCity.value = true
}
const hideEditForm = async () => {
  weatherData.value = await fetchWeatherData(cityInput.value)
  changeCity.value = false
}
</script>

<template>
  <div id="weather" class="weather-locationContainer">
    <p id="date" class="date">{{ formattedDate }}</p>
    <div class="location">
      <p id="city" class="city">{{ weatherData[0] || '---' }}</p>
      <div v-if="changeCity" id="cityUpdateContainer" class="inputContainer hidden">
        <input
          v-model="cityInput"
          id="cityInput"
          class="addInput"
          type="text"
          placeholder="Enter your city here"
        />
        <button id="updateCityButton" @click="hideEditForm" class="updateCityButton">Update</button>
      </div>
      <p v-else id="editCityButton" @click="showEditForm" class="editCity">Change</p>
      <div class="weather">
        <p id="currTemp">{{ weatherData[1] || '---' }} <sup>o</sup>C</p>
        <p id="condition">{{ weatherData[2] || '---' }}</p>
        <div class="high-low-temp">
          <p id="highTemp">H: {{ weatherData[3] || '---' }} <sup>o</sup>C</p>
          <p>|</p>
          <p id="lowTemp">L: {{ weatherData[4] || '---' }} <sup>o</sup>C</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.weather-locationContainer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #444;
  width: 35%;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: -0.1rem 0.1rem 1rem 1rem rgba(5, 5, 5, 0.092);
  font-size: 1.4rem;
  color: #30a2ff;
}

.weather {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.high-low-temp {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.location {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.editCity {
  text-decoration: underline;
  color: #fff;
  cursor: pointer;
}
@media (max-width: 768px) and (min-width: 425px) {
  .weather-locationContainer {
    width: 50%;
  }
}

@media (max-width: 425px) and (min-width: 375px) {
  .weather-locationContainer {
    width: 80%;
  }
}

@media (max-width: 320px) {
  .weather-locationContainer {
    width: 90%;
  }
}
</style>
