const express = require('express');
const app = express();

app.use(require('./contacto'));
app.use(require('./sms'));

module.exports = app;