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
    name: `pessoa recrutadora me nota pls`
});

const to_do_02 = new Item({
    name: `preciso de um emprego`
});

const to_do_03 = new Item({
    name: `pf pf pf eu faço até café se precisar`
});

const default_items = [to_do_01, to_do_02, to_do_03];

const list_Schema = new mongoose.Schema({
    name: String,
    items: [item_schema]
});

const List = mongoose.model('List', list_Schema);

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
});

app.post('/delete', (req, res)=>{
    const id = req.body.rm_item
    Item.findByIdAndDelete(id, err => err ? console.log(err) : console.log(`Item with _id: ${id} has been removed`));
    res.redirect('/');
});

app.get('/:customListName', (req, res)=>{
    const list_name = req.params.customListName;
    console.log(list_name)
    List.findOne({name: list_name}, (err, fList)=>{
        if(err){
            console.log(err);
        }
        else if(fList){
            console.log('else if');
            res.render('list', {title_ejs: fList.name, newListItems: fList.items});
        }
        else{
            console.log('else')
            const cList = new List({
                name: list_name,
                items: default_items
            });
            
            cList.save();
            res.redirect('/' + list_name);
        }
    });
})

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});