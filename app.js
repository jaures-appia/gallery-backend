require('babel-register')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const morgan = require('morgan')('dev')

app = express()
const port = process.env.PORT || 8000

// const stuffRoutes = require('./routes/stuffs')
const userRoutes = require('./routes/users')

app.get('/', (req, res) => {
	res.send("hello world")
})

app.use(morgan)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

mongoose.connect('mongodb+srv://joblack:Jolove141@cluster0-rmm0h.mongodb.net/gallery?retryWrites=true&w=majority',
{ useNewUrlParser: true,
useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
  
app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/v1/auth', userRoutes)

app.listen(port, console.log('starting ' + port))