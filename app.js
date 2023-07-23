const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs')
const path = require('path')
const userModel = require('./models/input');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set("view engine","ejs")
require('dotenv').config();
mongoose.connect(process.env.dbConn,  { useNewUrlParser: true, useUnifiedTopology: true }).then(
    console.log("connected successfully")
)
app.get('/', async function(req,res){
    // res.send("people list");
    
    try{
        // res.render('form.ejs');
        const users = await userModel.find({});
        res.render('form.ejs', {users});
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
    
})

app.post('/person', async function(req,res){
    
    // console.log(req.body)
    const result = await userModel.create(req.body);
    console.log(result);
    res.redirect('/');
    
})

app.put('/person/:id', async function(req,res){
    // const people = userModel.findByIdAndUpdate(req.params.id, req.body);
    // res.send(people);

    try {
        const people = await userModel.findByIdAndUpdate(req.params.id, req.body);
        res.json(people);
      } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
      }
})

app.delete('/person/:id', async function(req, res){
    // const people = userModel.findByIdAndDelete(req.params.id);
    // res.send(people);

    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Person deleted successfully' });
      } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
      }
})

app.listen(3000);