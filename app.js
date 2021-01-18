// Appeler dotenv au plus haut de l'application
require('dotenv/config');
// Charger les modules
//Express
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user.router');
const friendRouter = require('./routes/friend.router');
const bodyParser = require('body-parser');
// Initialisser les applications (express et MongoClient)
const app = express();

// app.use(bodyParser.json());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }))
const port = 3000;

// Etablir la connexion à la base
// mongoose.connect(process.env.DB_URL_CONNECTION, { useNewUrlParser: true }, () =>
// console.log('db connectée')
// );
mongoose.connect(process.env.DB_URL_CONNECTION,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Définir les routes
app.use('/users', userRouter);
app.use('/friends', friendRouter);

// demarer le server
app.listen( port, () => {console.log('connect to server')});
module.exports = app;