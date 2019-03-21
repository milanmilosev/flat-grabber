import express from 'express';
const app = express();
require('dotenv').config({ path: 'process.env' })
const database = require('./db/getDb');
const getFlats = require('./app');

database();
getFlats();


app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
});