const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use('/', express.static(__dirname+'./build'));

app.get('/', (req, res) => {
    res.sendFile(__dirname+'./build');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server online');
});
