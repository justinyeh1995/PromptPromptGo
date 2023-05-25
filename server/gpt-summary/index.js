const express = require('express');
const cors = require('cors');

const upload = require('./upload');
const summary = require('./summarize');

const app = express();

app.use(cors());
// app.use('/upload', upload);
app.use('/summarize', summary);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
