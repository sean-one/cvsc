const express = require('express');

const db = require('../data/models/events_model');

const router = express.Router();

// GET all events
router.get('/', (req, res) => {
    db.find()
        .then(events => {
            res.status(200).json(events);
        })
        .catch(err => res.status(500).json(err));
});

// GET single event by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(event => {
            if (event) {
                res.status(200).json(event);
            } else {
                res.status(404).json({ message: 'event not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'failed to connect to server', error: err });
        });
});

// POST (create) event
// router.post('/', async (req, res) => {
//     try {
//         const eventData = req.body;
//         const checkEmail = await db.
//     }
// })a

module.exports = router;