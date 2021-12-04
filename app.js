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
    let day = '';
    
    switch (currentyDay) {
        case 0:
            day = 'Sunday';
        break;

        case 1:
            day = 'Moonday';
        break;

        case 2:
            day = 'Tuesday';
        break;

        case 3:
            day = 'Wednesday';
        break;

        case 4:
            day = 'Thursday';
        break;

        case 5:
            day = 'Friday';
        break;

        case 6:
            day = 'Saturday';
        break;
    
        default:
            console.log(`Error: current day value is ${currentyDay}`);
        break;
    }

    res.render('list', {day_ejs: day})
})

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})