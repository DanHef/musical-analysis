const express = require('express');
const router = express.Router();
const { AnalysisEntity } = require('../model/model');

//get a single tag
router.get('/:id', async function (req, res) {
    try {
        res.send("Analysis");
    } catch (error) {
        res.sendStatus(400);
    }
});

module.exports = router;