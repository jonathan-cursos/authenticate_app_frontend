const express = require('express')
const cors = require('cors')
const path = require('path')
const routes = require('./routes')
const config = require('./config')
const app = express()

app.use(cors())
app.use(express.json())

app.set('port', config.port)
app.use('/auth', routes)
app.use('/', express.static(path.join(__dirname, 'dist')))

app.listen(app.get('port'), () => console.log(`Listen on port ${config.port}`))