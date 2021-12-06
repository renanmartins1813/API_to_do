//jshint eversion:6
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const date = require(__dirname + '/date.js')
const app = express();
const port = 4040;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// const items = ['frist', 'second', 'third'];
// const work_items = [];

mongoose.connect('mongodb://martins:root1432@localhost:27018/al_to_doDB?authSource=admin');

const item_schema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, `a name to a new 'item' is required, check your inputs`]
    }
});

const Item = mongoose.model('Item', item_schema);

const to_do_01 = new Item({
    name: `LF for a job`
});

const to_do_02 = new Item({
    name: `procuro emprego jr.`
});

const to_do_03 = new Item({
    name: `pessoa recrutadora me nota pls`
});

const default_items = [to_do_01, to_do_02, to_do_03];

app.get('/', (req, res)=>{
    const day = date.getDate();
    const items = [];
    Item.find({},(err, item)=>{
        if(err){
            console.log(err);
        }
        else if(item.length === 0){
            Item.insertMany(default_items, err=>{
                err ? console.log(err) : console.log(`default_items saved`);
            });
            res.redirect('/');
        }
        else{
            res.render('list', {title_ejs: day, newListItems: item});
        }
    });
});

app.post('/', (req, res)=>{
    
    const item_name = req.body.newItem;
    const item = new Item({
        name: item_name
    });
    item.save();
    res.redirect('/');
    // if(req.body.submit_button === 'Work'){
    //     work_items.push(item);
    //     res.redirect('/work');
    // }
    // else{
        
    //     items.push(item);
    //     res.redirect('/');
    // }
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