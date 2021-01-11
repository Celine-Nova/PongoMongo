// Appeler dotenv au plus haut de l'application
require('dotenv/config');
// Charger les modules
//Express
const express = require('express');
const mongoose = require('mongoose');
const bodyPerser = require('body-parser');
const userRouter = require('./routes/user.router');
const bodyParser = require('body-parser');
// Initialisser les applications (express et MongoClient)
const app = express();

app.use(bodyParser.json());
const port = 3000;

// Etablir la connexion à la base
mongoose.connect(process.env.DB_URL_CONNECTION, { useNewUrlParser: true }, () =>
console.log('db connectée')
);


// Définir les routes
app.use('/users', userRouter);
// demarer le server
app.listen( port, () => {console.log('connet to server')});
module.exports = app;