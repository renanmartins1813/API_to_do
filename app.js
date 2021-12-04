//jshint eversion:6
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.get('/', (req, res)=>{
    res.send('Fucc')
})

app.listen(4040, ()=>{
    console.log("Server started on port 4040");
})