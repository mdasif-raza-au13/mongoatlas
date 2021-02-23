import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import subroutes from './routes/userRoutes.js'
import dotenv from 'dotenv';
dotenv.config()

const port = process.env.PORT || 1256;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(process.env.url,{useNewUrlParser:true, useUnifiedTopology:true});

const db = mongoose.connection;

db.on('error',(error) => console.error(error));
db.once('open',() => console.log('database connected'));

app.use('/api',subroutes);
app.get('/',(req,res) => {
    res.send('Server is running ok...');
});
app.all('*',(req,res) => {
    res.send('Entered wrong api');
});

app.listen(port,(err) => {
    if(err) throw err;
    console.log(`listening on http://localhost:${port}`);
});