const express = require('express');
const router = express.Router();
const { AnalysisEntity } = require('../model/model');

//create new analysis with name
router.post('/', function(req,res) {
    const body = req.body;

    const newAnalysis = new AnalysisEntity({
        id: body.id,
        started: body.started,
        stopped: body.stopped
    });

    newAnalysis.save()
        .then(() => {
            res.send("Analysis Created Successfully");
        })
        .catch(() => {
            res.send('Analysis Creation Error');
        });
});

//get all analysis
router.get('/', async function (req, res) {
    try {
        const allAnalysis = await AnalysisEntity.findAll();
        res.send(allAnalysis);
    } catch (error) {
        res.sendStatus(400);
    }
});

//get a single tag
router.get('/:id', async function (req, res) {
    try {
        const analysis = await AnalysisEntity.findAll({
            where: {
                id: req.params.id
            }
        });
        res.send(analysis);
    } catch (error) {
        res.sendStatus(400);
    }
});

module.exports = router;