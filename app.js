require('dotenv').config();

const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const analysis = require('./routes/analysis.route');
const parts = require('./routes/parts.route');
const tags = require('./routes/tags.route');

//DB Model
const { AnalysisEntity, PartEntity, TagEntity } = require('./model/model');

const app = express();

//Routes
app.use('/analysis', analysis);
app.use('/parts', parts);
app.use('/tags', tags);

//start server
app.use(express.static(path.join(__dirname, 'public')));

app.listen(4500, function () {
  console.log('Example app listening on port 4500!');
});