const express = require('express');

const db = require('../data/models/disp_model');

const router = express.Router();

// GET all dispensaries
router.get('/', (req, res) => {
    db.find()
        .then(disp => {
            res.status(200).json(disp);
        })
        .catch(err => res.status(500).json(err));
});

// GET user by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(disp => {
            if (disp) {
                res.status(200).json(disp);
            } else {
                res.status(404).json({ message: 'dispensary not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'failed to connect to server', error: err });
        });
});

// POST (create) dispensary
router.post('/', async (req, res) => {
    try {
        const dispData = req.body;
        const checkEmail = await db.findByEmail(dispData.email);
        if(!checkEmail) {
            try {
                const dispId = await db.add(dispData);
                res.status(201).json(dispId);
            } catch (error) {
                res.status(404).json({ error: 'unable to add dispensary to database' });
            }
        } else {
            res.status(200).json(checkEmail);
        }
    } catch (error) {
        let message = 'error creating the user';
        res.status(500).json({ message, error });
    }
});

// UPDATE dispensary by ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db.update(id, changes)
        .then(count => {
            if (count) {
                res.status(200).json({ message: `${count} dispensary / dispensaries updated` });
            } else {
                res.status(404).json({ message: 'dispensary not fount' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error connecting to the server', err });
        });
});

// DELETE dispensary by ID
router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
        .then(count => {
            if (count < 1) {
                res.status(404).json({ message: 'that dispensary id is unknown' });
            } else {
                res.status(200).json({ message: 'dispensary has been deleted' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error deleting dispensary' });
        });
});

module.exports = router;