const express = require('express');
const cors = require('cors');
const path = require('path');
const Web3 = require('web3');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..'))); // Serve GUI directory

// Web3 setup
const web3 = new Web3('http://localhost:8545'); // Connect to Ganache

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../home.html'));
});

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});