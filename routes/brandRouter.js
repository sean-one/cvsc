const express = require('express');

const db = require('../data/models/brands_model')

const router = express.Router();

router.get('/', (req, res) => {
    db.find()
        .then(brands => {
            res.status(200).json(brands);
        })
        .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(brand => {
            if (brand) {
                res.status(200).json(brand);
            } else {
                res.status(404).json({ message: 'user not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'failed to connect to server' });
        });
});

router.post('/', async (req, res) => {
    try {
        const brandData = req.body;
        const checkId = await db.findById(brandData.id);
        if (!checkId) {
            try {
                const brandId = await db.add(brandData);
                res.status(201).json(brandId);
            } catch (error) {
                res.status(500).json({ error: 'unable to add brand to database' })
            }
        } else {
            res.status(200).json(checkId);
        }
    } catch (error) {
        let message = 'error creating brand';
        res.status(500).json({ message, error});
    }
});

module.exports = router;