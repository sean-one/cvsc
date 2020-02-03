const express = require('express');

const db = require('../data/models/disp_filter_model');

const router = express.Router();

// GET all Disp Filters
router.get('/', (req, res) => {
    db.find()
        .then(filters => {
            res.status(200).json(filters);
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;