const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use('/src', express.static(__dirname+'/src/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/src/App.js');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server online');
});