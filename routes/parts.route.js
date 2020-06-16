const express = require('express');
const router = express.Router();
const { PartEntity } = require('../model/model');

//get a single part
router.get('/:id', async function (req, res) {
    try {
        res.send("Part");
    } catch (error) {
        res.sendStatus(400);
    }
});

module.exports = router;