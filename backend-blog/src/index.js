/*Archivo que va arrancar */
//Requerimos de express
const express  = require('express');
const morgan = require('morgan');
const cors = require('cors');

const storeRoutes = require('./routes/store.routes');
const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(storeRoutes);

app.use((err,req,res,next) => {
    return res.json({
        message: err.message
    })
    });

app.listen(4000);//puerto que va a escuchar este servidor
console.log('Server on port 4000');