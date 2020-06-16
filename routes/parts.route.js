const express = require('express');
const router = express.Router();
const { PartEntity } = require('../model/model');

//create new part
router.post('/', function(req,res) {
    const body = req.body;

    const newPart = new PartEntity({
        id: body.id,
        started: body.started,
        stopped: body.stopped
    });

    newPart.save()
        .then(() => {
            res.send("Part Created Successfully");
        })
        .catch(() => {
            res.send('Part Creation Error');
        });
});

//get all parts
router.get('/', async function (req, res) {
    try {
        const allParts = await PartEntity.findAll();
        res.send(allParts);
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

        if(part.length === 0) {
            res.sendStatus(400);
        } else {
            res.send(part);
        }
    } catch (error) {
        res.sendStatus(400);
    }
});

module.exports = router;