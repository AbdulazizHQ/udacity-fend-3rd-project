/* Global Variables */
const url = 'https://api.openweathermap.org/data/2.5/weather?'
const apiKey = 'cb6d58000d1ca95884bfaef5c0cda2cb'

const generateButton = document.getElementById('generate')
const zipcodeField = document.getElementById('zip')
const userResponseField = document.getElementById('feelings')

const mostRecentTemprature = document.getElementById('temp')
const mostRecentDate = document.getElementById('date')
const mostRecentContent = document.getElementById('content')

// Create a new date instance dynamically with JS
const d = new Date()
const newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear()

async function getWeather (zipcode) {
  const params = new URLSearchParams({
    zip: zipcode,
    appid: apiKey
  })

  const response = await fetch(url + params)
  if (!response.ok) {
    throw new Error(response.statusText)
  } else {
    const body = await response.json()
    return body.main.temp
  }
}

async function postWeather (temprature, date, userResponse) {
  const request = await fetch('/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      temprature: temprature,
      date: date,
      userResponse: userResponse
    })
  })
  if (!request.ok) {
    console.log(`Failed request: ${request.statusText}`)
  } else {
    return temprature
  }
}

function updateMostRecentEntry (temprature, date, userResponse) {
  mostRecentTemprature.innerHTML = temprature
  mostRecentDate.innerHTML = date
  mostRecentContent.innerHTML = userResponse
}

generateButton.addEventListener('click', async () => {
  const zipcode = zipcodeField.value
  const userResponse = userResponseField.value
  getWeather(zipcode)
    .then(temp => postWeather(temp, newDate, userResponse))
    .then(temp => updateMostRecentEntry(temp, newDate, userResponse))
    .catch(error => console.log(error))
})
