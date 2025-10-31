// Dependencies
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');


// Express connection and cors middleware
const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;

// Connection
mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error", err));

// Connection 

// Tables
const ItemSchema = new mongoose.Schema({
    Item: { type: String, requried: true },
    price: { type: Number, required: true }

});

const Item = mongoose.model('Item', ItemSchema);

//Tables
//API Interaction
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'", "http://localhost:5000"],
        },
    })
);

app.get('/state', async (req, res) => {
    const states = ['disconnected', 'Connected', 'Connecting', 'disconnecting'];
    const state = states[mongoose.connection.readyState] || 'unknown';
    res.json({ status: state })
});


app.post('/items', async (req, res) => {
    const { name, price } = req.body
    const item = new Item({ Item: name, price });
    await item.save();
    res.status(201).send(item);
});


app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.send(items);
});

app.delete('/items/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).send({ Message: 'Item is not found' });
        res.send({ Message: 'Item Deleted Successfully', item: deletedItem });
    } catch (error) {
        res.status(500).send({ Message: 'Error deleted item', error });
    }
});

// API Interaction

// Terminal Debugging - Checking State and PORT
app.listen(PORT, () => {
    console.log(`Server Running on PORT: ${PORT}`)
});

console.log('MongoDB URI:', process.env.MONGO_URI);
console.log('MongoDB readyState:', mongoose.connection.readyState);

// Terminal Debugging - Checking State and PORT

