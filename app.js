//jshint eversion:6
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const date = require(__dirname + '/date.js')
const app = express();
const port = 4040;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const items = ['frist', 'second', 'third'];
const work_items = [];

app.get('/', (req, res)=>{
    const day = date.getDate();
    res.render('list', {title_ejs: day, newListItems: items});
});

app.post('/', (req, res)=>{
    
    const item = req.body.newItem;

    if(req.body.submit_button === 'Work'){
        work_items.push(item);
        res.redirect('/work');
    }
    else{
        
        items.push(item);
        res.redirect('/');
    }
});

app.get('/work', (req, res)=>{
    res.render('list', {title_ejs: 'Work List', newListItems: work_items});
});

app.post('/work', (req, res)=>{
    const new_work = req.body.newItem;
    work_items.push(new_work);
    res.redirect('/work');
});

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});