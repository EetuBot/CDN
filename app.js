const express = require('express')
const app = express()
const config = require('./config.json')
const fs = require('fs')
const helmet = require('helmet')
const base64Img = require('base64-img');

app.use(helmet())
app.use(express.static('public'))
 
app.get('/image/apina', function (req, res) {
  const kuvat = fs.readdirSync(__dirname + '/public/assets/images/apinat/')
  const kuva = __dirname + '/public/assets/images/apinat/' + kuvat[Math.floor(Math.random() * kuvat.length)]

  var imageData1 = base64Img.base64Sync(kuva);
  var base64Data = imageData1.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
  var img = Buffer.from(base64Data, 'base64');

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length
  });

  res.end(img); 
})

app.get('*', (req, res) => {
  return res.send({
    success: false,
    code: 404,
    message: 'The requested url was not found from the server. We fully apologize for this.'
  })
})
 
app.listen(config.port)