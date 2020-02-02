const express = require('express');

const db = require('../data/models/brands_model')

const router = express.Router();

// GET all brands
router.get('/', (req, res) => {
    db.find()
        .then(brands => {
            res.status(200).json(brands);
        })
        .catch(err => res.status(500).json(err));
});

// GET brand by ID
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

// POST (create) brand
router.post('/', async (req, res) => {
    try {
        const brandData = req.body;
        const checkEmail = await db.findByEmail(brandData.email);
        if (!checkEmail) {
            try {
                const brandId = await db.add(brandData);
                res.status(201).json(brandId);
            } catch (error) {
                res.status(500).json({ error: 'unable to add brand to database' })
            }
        } else {
            res.status(200).json(checkEmail);
        }
    } catch (error) {
        let message = 'error creating brand';
        res.status(500).json({ message, error});
    }
});

// UPDATE brand by ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    // need to update 'updated_at' column
    db.update(id, changes)
        .then(count => {
            if (count) {
                res.status(200).json({ message: `${count} brand(s) updated` });
            } else {
                res.status(404).json({ message: 'brand not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error connecting to the server', err });
        });

});

// DELETE brand by ID
router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
        .then(count => {
            if (count < 1) {
                res.status(404).json({ message: 'that brand id is unknown' });
            } else {
                res.status(200).json({ message: 'brand has been deleted' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error deleting brand', err });
        });
});


module.exports = router;