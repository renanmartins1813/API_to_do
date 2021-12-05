//jshint eversion:6
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const port = 4040;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

let items = ['frist', 'second', 'third'];
let work_items = [];

app.get('/', (req, res)=>{
    const today = new Date();

    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    const day = today.toLocaleDateString('en-US', options);

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