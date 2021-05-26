const express = require('express')
const app = express()
const config = require('./config.json')
const fs = require('fs')
const helmet = require('helmet')

app.use(helmet())
app.use(express.static('public'))
 
app.get('/image/apina', function (req, res) {
  const kuvat = fs.readdirSync(__dirname + '/public/assets/images/apinat/')
  const url = req.protocol + '://' + req.get('host');
  return res.send({
    success: true,
    code: 200,
    image: url + '/assets/images/apinat/' + kuvat[Math.floor(Math.random() * kuvat.length)]
  })
})

app.get('*', (req, res) => {
  return res.send({
    success: false,
    code: 404,
    message: 'The requested url was not found from the server. We fully apologize for this.'
  })
})
 
app.listen(config.port)