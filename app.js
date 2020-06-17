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

//CORS
app.use(function (req, res, next) {
    console.log
    res.header("Access-Control-Allow-Origin", process.env.CORS_ALLOWED_ORIGIN);
    res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials", true);

    if(req.method === 'OPTIONS') {
        res.sendStatus(204);
    }
    else {
        next();
    }
});

//Body Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes
app.use('/api/v1/analysis', analysis);
app.use('/api/v1/parts', parts);
app.use('/api/v1/tags', tags);

//start server
app.use(express.static(path.join(__dirname, 'public')));

app.listen(4500, 'localhost', function () {
  console.log('Example app listening on port 4500!');
});