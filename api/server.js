const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// route imports 
const apiRoutes = require('./routes/api')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message });
})
const uri = 'mongodb+srv://ssalcedo00:nalgonio1@cluster0-vtosk.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully.");
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// '/api' GET route
app.use('/api', apiRoutes);

app.use((error, req, res, next) => {
    //console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ error: error, message: message});
});

// console.log that your server is up and running
app.listen(port, () => console.log(` > Listening on port ${port}`));