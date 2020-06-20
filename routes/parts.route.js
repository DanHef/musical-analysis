const express = require('express');
const router = express.Router();
const { PartEntity, AnalysisEntity, TagEntity } = require('../model/model');

//create new part
router.post('/', function (req, res) {
    const body = req.body;

    const newPart = new PartEntity({
        id: body.id,
        started: body.started,
        stopped: body.stopped,
        username: body.username,
        analysisId: body.analysisId,
        tagId: body.tagId,
        description: body.description
    });

    newPart.save()
        .then(() => {
            res.send(newPart);
        })
        .catch((error) => {
            res.sendStatus(409);
        });
});

// update existing part
router.put('/:id', async function (req, res) {
    const body = req.body;

    await PartEntity.update(
        {
            started: body.started,
            stopped: body.stopped,
            username: body.username,
            analysisId: body.analysisId,
            tagId: body.tagId,
            description: body.description,
            submitted: body.submitted
        },
        { where: { id: req.params.id } }
    )

    res.sendStatus(204);
});


//get all parts
router.get('/', async function (req, res) {
    const username = req.query.username;
    const analysisId = req.query.analysisId;
    const partsResponse = [];

    try {
        let allParts = await PartEntity.findAll({
            where: {
                username,
                analysisId
            }
        });

        const analysis = await AnalysisEntity.findByPk(analysisId);
        

        for (const part of allParts) {
            const result = calculateRelativeTimes(part, analysis);
            const tag = await TagEntity.findByPk(part.tagId);

            const partResponse = {
                id: part.id,
                started: part.started,
                stopped: part.stopped,
                username: part.username,
                analysisId: part.analysisId,
                tagId: part.tagId,
                tagDescription: tag ? tag.description : '',
                description: part.description,
                submitted: part.submitted,
                relStarted: result.relStarted,
                relStopped: result.relStopped
            }

            partsResponse.push(partResponse);
        }

        res.send(partsResponse);
    } catch (error) {
        res.sendStatus(400);
    }
});

//get a single part
router.get('/:id', async function (req, res) {
    try {
        const part = await PartEntity.findAll({
            where: {
                id: req.params.id
            }
        });

        if (part.length === 0) {
            res.sendStatus(400);
        } else {
            res.send(part);
        }
    } catch (error) {
        res.sendStatus(400);
    }
});

function calculateRelativeTimes(part, analysis) {
    let relStarted;
    let relStopped;

    if (part.started && analysis.started) {
        relStarted = part.started.getTime() - analysis.started.getTime();
    }

    if (part.stopped && analysis.started) {
        relStopped = part.stopped.getTime() - analysis.started.getTime();
    }
    return {
        relStarted,
        relStopped
    }
}

module.exports = router;