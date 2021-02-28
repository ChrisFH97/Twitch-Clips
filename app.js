const express = require('express')
const app = express()
const cors = require('cors')
const port = 80

app.use(express.static('public')) // relative path of client-side code
app.use(cors())
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname })
})

app.get('/data', (req, res) => {
  res.sendFile('clips.json', { root: __dirname })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})