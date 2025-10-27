const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');



const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error", err));


app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'", "http://localhost:5000"]
        },
    })
);


app.get('/db', async (req, res) => {
    const states = ['disconnected', 'connected', 'connecting', 'disconnectiong'];
    const state = states[mongoose.connection.readyState] || 'unknown';
    res.json({ status: state })
});

app.get('/test', (req, res) => {
    const test = ["test"];
    res.json(test);
});


app.get('/', async (req, res) => {
    res.send('backend it running');
});


app.listen(PORT, () => {
    console.log(`Server Running on PORT: ${PORT}`)
});

console.log('MongoDB URI:', process.env.MONGO_URI);
console.log('MongoDB readyState:', mongoose.connection.readyState);

