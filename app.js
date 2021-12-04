//jshint eversion:6
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const moment = require('moment');
const app = express();
const port = 4040;

app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    const todayM = moment();
    const currentyDay = todayM.day();

    if(currentyDay === 6 || currentyDay === 0){
        res.send(`DIA: ${currentyDay} FODENDO DIA DE USAR DROGA!!!`);
    }
    else{
        res.send(`Dia: ${currentyDay} :( dia de ficar tristo`)
    }
})

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})