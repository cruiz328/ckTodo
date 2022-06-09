require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
//server
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('successfully connected to mongodb');
})
.catch(err => console.log(err));

app.listen(PORT, () => console.log('Successfully created server'));