const express = require('express');

const db = require('../data/models/brand_filter_model');

const router = express.Router();

// GET all FILTERS
router.get('/', (req, res) => {
    db.find()
        .then(filters => {
            res.status(200).json(filters);
        })
        .catch(err => res.status(500).json(err));
});

// GET ALL USERS with BRAND ID
router.get('/brand/:id', (req, res) => {
    const { id } = req.params;
    db.findByBrand(id)
        .then(users => {
            if (users) {
                res.status(200).json(users);
            } else {
                res.status(404).json({ message: 'no users found for that brand' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'failed to connect to the server', error: err });
        });
});

// GET ALL BRANDS with USER ID
router.get('/user/:id', (req, res) => {
    const { id } = req.params;
    db.findByUser(id)
        .then(brands => {
            if (brands) {
                res.status(200).json(brands);
            } else {
                res.status(404).json({ message: 'no brands found for that user' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'failed to connect to the server', error: err });
        });
});

// POST (create) BRAND filter to USER ID
router.post('/:user/:brand', async (req, res) => {
    try {
        const filter = {
            brand_id: req.params.brand,
            user_id: req.params.user
        }
        const checkExist = await db.findFilter(filter.user_id, filter.brand_id);
        if(!checkExist) {
            try {
                const filterId = await db.add(filter);
                res.status(201).json(filterId);
            } catch (error) {
                res.status(404).json({ error: 'user already has brand filtered' });
            }
        } else {
            res.status(200).json({ error: 'filter already exist' });
        }
    } catch (error) {
        let message = 'error creating the filter';
        res.status(500).json({ message, error });
    }
});

// DELETE BRAND filter by USER ID
router.delete('/:user/:brand', (req, res) => {
    db.remove(req.params.user, req.params.brand)
        .then(count => {
            if (count < 1) {
                res.status(404).json({ message: 'that user does not have that brand filter set' });
            } else {
                res.status(200).json({ message: 'that brand filter has been removed' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error deleting filter', err });
        });
});

module.exports = router;