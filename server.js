// Setup empty JS object to act as endpoint for all routes
const projectData = {}

let key = 0

// Require Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express()

/* Middleware */
// Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'))

// Setup Server

app.get('/all', (req, res) => {
  res.send(projectData)
})

app.post('/add', (req, res) => {
  console.log(req.body)
  projectData[`${key}`] = {
    temprature: req.body.temprature,
    date: req.body.date,
    userResponse: req.body.userResponse
  }

  res.status('200').send({ key: key++ })
})

const port = 8080
app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})
