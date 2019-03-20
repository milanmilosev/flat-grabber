import express from 'express';
const app = express();

app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
});