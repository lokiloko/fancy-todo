var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
var credentials = {key: privateKey, cert: certificate};
const cors = require('cors');
const auth = require('./routes/auth')
const todo = require('./routes/todo')
const user = require('./routes/user')
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())

app.use('/api/auth', auth)
app.use('/api/todos', todo)
app.use('/api/users', user)

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(3000);
// httpsServer.listen(443);
