const express = require('express');

const db = require('../data/models/ul_model');

const router = express.Router();

router.get('/:entity/:list', (req, res) => {
    // console.log(req.params.entity)
    db.findBrands(req.params.entity, req.params.list)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;