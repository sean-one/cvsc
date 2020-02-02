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
router.post('/', async (req, res) => {
    try {
        const eventData = req.body;
        // need a way to check that event is not duplicated
        const eventId = await db.add(eventData);
        res.status(201).json(eventId);
    } catch (error) {
        let message = 'error creating the user';
        res.status(500).json({ message, error });
    }
});

// UPDATE event by ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    // need an update to the create_at column
    db.update(id, changes)
        .then(count => {
            if (count) {
                res.status(200).json({ message: `${count} event(s) updated` });
            } else {
                res.status(404).json({ message: 'event not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error connecting to the server', err });
        });
});

// DELETE event by ID
router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
        .then(count => {
            if (count < 1) {
                res.status(404).json({ message: 'that event id is unknown' });
            } else {
                res.status(200).json({ message: 'event has been deleted' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error deleting event', err });
        });
});

module.exports = router;