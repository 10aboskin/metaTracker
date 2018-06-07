const express = require('express'), app = express()

app.set('view engine', 'pug')
app.use(require('./controllers'))

app.listen(8080, () => console.log('listening on port 8080...'))
