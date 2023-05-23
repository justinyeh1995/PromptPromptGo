const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Configuration, OpenAIApi } = require("openai");

router.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gpt-summary')

// Configure OpenAI API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/', async (req, res) => {
    const pdfFile  = req.body.file;
    const pdfName  = req.body.name;
    // const response = await openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: "A neutron star is the collapsed core of a massive supergiant star, which had a total mass of between 10 and 25 solar masses, possibly more if the star was especially metal-rich.[1] Neutron stars are the smallest and densest stellar objects, excluding black holes and hypothetical white holes, quark stars, and strange stars.[2] Neutron stars have a radius on the order of 10 kilometres (6.2 mi) and a mass of about 1.4 solar masses.[3] They result from the supernova explosion of a massive star, combined with gravitational collapse, that compresses the core past white dwarf star density to that of atomic nuclei.\n\nTl;dr",
    //     temperature: 0.7,
    //     max_tokens: 60,
    //     top_p: 1.0,
    //     frequency_penalty: 0.0,
    //     presence_penalty: 1,
    //   });

    // console.log(response.data);

    // const summary = response.data.choices[0].text;
    // res.json({ summary });
    res.json({ summary: "This is a summary" });
});

module.exports = router;
