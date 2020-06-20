const express = require('express');
const router = express.Router();
const { AnalysisEntity, PartEntity, AnalysisUserEntity } = require('../model/model');

// create user analysis relation with status
router.post('/:analysisId/user', function (req, res) {
    const body = req.body;

    const newAnalysisUser = new AnalysisUserEntity({
        analysisId: req.params.analysisId,
        username: body.username,
        status: body.status
    });

    newAnalysisUser.save().then(() => {
        res.send(newAnalysisUser);
    }).catch(() => {
        res.sendStatus(409);
    });
});

//create new analysis with name
router.post('/', function (req, res) {
    const body = req.body;

    const newAnalysis = new AnalysisEntity({
        id: body.id,
        started: body.started,
        stopped: body.stopped
    });

    newAnalysis.save().then(() => {
        res.send(newAnalysis);
    }).catch((error) => {
        res.sendStatus(409);
    });
});

//update analysis
router.put('/:id', async function (req, res) {
    const body = req.body;
    try {
        await AnalysisEntity.update(
            {
                started: body.started,
                stopped: body.stopped
            },
            { where: { id: req.params.id } }
        )

        res.sendStatus(204);
    } catch (error) {
        res.sendStatus(409);
    }
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


//get a single analysis for a user
router.get('/:id/user/:username', async function (req, res) {
    try {
        const analysis = await AnalysisEntity.findAll({
            where: {
                id: req.params.id
            }
        });

        const analysisUser = await AnalysisUserEntity.findAll({
            where: {
                analysisId: req.params.id,
                username: req.params.username
            }
        });

        const analysisResponse = {
            "id": analysis[0] ? analysis[0].id : null,
            "started": analysis[0] ? analysis[0].started : null,
            "stopped": analysis[0] ? analysis[0].stopped : null,
            "analysisUser": analysisUser ? analysisUser[0] : null
        };

        res.send(analysisResponse);
    } catch (error) {
        res.sendStatus(400);
    }
});


//get statistics for analysis
router.get('/:id/statistics', async function (req, res) {
    try {
        const analysisUser = await AnalysisUserEntity.findAll({
            where: {
                analysisId: req.params.id,
                status: 1
            }
        });

        let usernames = [];
        for (singleAnalysisUser of analysisUser) {
            usernames.push(singleAnalysisUser.username);
        }

        const allParts = await PartEntity.findAll({
            where: {
                analysisId: req.params.id,
                username: usernames
            }
        });

        let statisticsResponse = {};

        for (const part of allParts) {
            if (!statisticsResponse[part.username]) {
                statisticsResponse[part.username] = [];
            }
            statisticsResponse[part.username].push(part);
        }

        res.send(statisticsResponse);
    } catch (error) {
        res.sendStatus(400);
    }
});


//get a single analysis
router.get('/:id', async function (req, res) {
    try {
        const analysis = await AnalysisEntity.findByPk(req.params.id);
        res.send(analysis);
    } catch (error) {
        res.sendStatus(400);
    }
});


// delete analysis
router.delete('/:id', async function (req, res) {
    try {
        AnalysisEntity.destroy({
            where: {
                id: req.params.id
            }
        });

        PartEntity.destroy({
            where: {
                analysisId: req.params.id
            }
        });

        res.send(204);
    } catch (error) {
        res.sendStatus(500);
    }
});

module.exports = router;