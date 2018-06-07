const logger = require('morgan')

const express = require('express'), app = express()

app.set('view engine', 'pug')
app.use(logger('dev'))
app.use(require('./controllers'))

module.exports = app
