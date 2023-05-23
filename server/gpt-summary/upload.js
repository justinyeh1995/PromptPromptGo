const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), (req, res) => {
    const { file } = req;
    const { originalname, mimetype, size } = file;
    const { name, ext } = path.parse(originalname);
    const { path: filePath } = file;
    
    }   
);

// Store the file in MongoDB
const { Schema } = mongoose;
const fileSchema = new Schema({
    originalname: String,
    mimetype: String,
    size: Number,
    newName: String,
    createdAt: { type: Date, default: Date.now },
});

const File = mongoose.model('File', fileSchema);

router.post('/store', (req, res) => {
    const { originalname, mimetype, size, newName } = req.body;
    const file = new File({
        originalname,
        mimetype,
        size,
        newName,
    });
    file.save((err, file) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to save file' });
        } else {
            res.json(file);
        }
    });
});


module.exports = router;

