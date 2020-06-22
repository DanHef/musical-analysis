const express = require('express');
const router = express.Router();
const { TagEntity } = require('../model/model');

// create tag
router.post('/', async function (req, res) {
    const body = req.body;

    const newTag = new TagEntity({
        id: body.id,
        description: body.description
    });

    newTag.save()
        .then(() => {
            res.send(newTag);
        })
        .catch((error) => {
            res.sendStatus(409);
        });
});

router.delete('/:id', async function (req, res) {
    try {
        TagEntity.destroy({
            where: {
                id: req.params.id
            }
        });

        res.sendStatus(204);
    } catch(_error) {
        res.sendStatus(409);
    }
});

//get all tags
router.get('/', async function (req, res) {
    try {
        const allTags = await TagEntity.findAll();
        res.send(allTags);
    } catch (error) {
        res.sendStatus(400);
    }
});

module.exports = router;