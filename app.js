require('babel-register')
const express = require('express')

app = express()
const port = process.env.PORT || 8000

app.use('/', (req, res) => {
	res.send("hello world")
})

app.listen(port, console.log('starting ' + port))