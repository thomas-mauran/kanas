const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Kana data: Hiragana and Katakana
const kanaData = [
    { kana: 'あ', romaji: 'a' },
    { kana: 'い', romaji: 'i' },
    { kana: 'う', romaji: 'u' },
    { kana: 'え', romaji: 'e' },
    { kana: 'お', romaji: 'o' },
    { kana: 'か', romaji: 'ka' },
    { kana: 'き', romaji: 'ki' },
    { kana: 'く', romaji: 'ku' },
    { kana: 'け', romaji: 'ke' },
    { kana: 'こ', romaji: 'ko' },
];

// Endpoint to get a random kana
app.get('/kana', (req, res) => {
    const randomKana = kanaData[Math.floor(Math.random() * kanaData.length)];
    res.json({ kana: randomKana.kana });
});

// Endpoint to check user input
app.post('/kana/check', (req, res) => {
    const { kana, romaji } = req.body;
    const foundKana = kanaData.find(k => k.kana === kana);

    if (!foundKana) {
        return res.status(400).json({ message: 'Kana not found.' });
    }

    const isCorrect = foundKana.romaji === romaji;
    res.json({ correct: isCorrect });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
