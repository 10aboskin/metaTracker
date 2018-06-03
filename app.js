const express = require('express')

const getData = require('./getData')
const renderLists = require('./renderLists')

const app = express()
app.set('view engine', 'pug')
app.use(getData)
app.use(renderLists)
app.get('/')

app.listen(8080, () => console.log('listening on port 8080...'))
