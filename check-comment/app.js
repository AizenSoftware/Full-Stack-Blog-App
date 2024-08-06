const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/check-comment', async (req, res) => {
    const { comment } = req.body;

    try {
        const response = await axios.post('http://127.0.0.1:5000/predict', { comment: comment });
        const result = response.data.result;

        res.json({ result: result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Bir hata oluştu.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
