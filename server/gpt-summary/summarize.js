require('dotenv').config();
const fs = require('fs');
const multer = require('multer');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const pdf = require("pdf-parse");
const mongoose = require('mongoose');
const { Configuration, OpenAIApi } = require("openai");
const { userInfo } = require('os');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(multer({ dest: 'uploads/' }).single('file'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gpt-summary')

// Configure OpenAI API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.post('/', async (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
    }
    const file  = req.file;
    console.log('File uploaded:', file.originalname);
    
    // read the file in chunks and send it to chatgpt
    const pdffile = fs.readFileSync(req.file.path);
    const pdfdata = await pdf(pdffile);
    const pdftext = pdfdata.text; 
    // chunk the text into 1000 word chunks
    const chunksize = 512;
    const chunks = [];
    for (let i = 0; i < pdftext.length; i += chunksize) {
        chunks.push(pdftext.slice(i, i + chunksize));
    }
    console.log(chunks.length);
    // ask chatgpt to summarize the file
    const summary = [];
    for (let i = 100; i < 101; i++) {
        const summarytext = await generateSummaries(chunks[i]);
        console.log(summarytext);
        summary.push(summarytext);
    }
    res.json({ summary });
});

async function generateSummaries(chunks) {
    console.log(chunks);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: 'user',
          content: `${chunks} \n\ Summarize the above text in no more than 150 words:\n\n`
        }
      ],
      temperature: 0.6,
      max_tokens: 512,
    });

    const summarytext = response.data.choices[0].message;
    return summarytext.content;
}

module.exports = router;
