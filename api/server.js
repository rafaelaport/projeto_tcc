/*const express = require('express') 
const axios = require('axios')
const app = express() 
const cors = require('cors')

app.use(cors()) 

app.get('/api/v1/medir', function (req, res) { 
 
  axios.get('http://192.168.0.18').then(function(resposta){
    
  console.log(resposta.data.leitura_ph);

  }).catch(function(error){
    console.log(error);
  });

})

app.listen(3000) */