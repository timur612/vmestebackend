const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = 'mongodb+srv://timur:AqBxOZGRtFIoA7l8@cluster0.2k1uk.mongodb.net/mpit22?retryWrites=true&w=majority';

app.use(usersRoutes);

async function start(){
    try{
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(PORT, ()=>{
            console.log('Server has been started on '+PORT)
        })
    }catch(e){
        console.log(e)
    }
}

start()