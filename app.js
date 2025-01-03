const express = require('express');
const path = require('path');
const cors = require('cors');

const todoInfoRouter  =  require("./routes/todoRoutes");

const app = express();
app.use(express.json());

app.use(cors({
    origin: true,
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    credentials: true
}))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/api', todoInfoRouter);

module.exports = app;
