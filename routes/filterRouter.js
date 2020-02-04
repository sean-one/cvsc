const express = require('express');

const db = require('../data/models/filter_model');

const router = express.Router();


/*

BRAND FILTER ROUTES

*/

// GET all BRAND filters
router.get('/b', (req, res) => {
    db.findBrands()
        .then(filters => {
            res.status(200).json(filters);
        })
        .catch(err => res.status(500).json(err));
});

// GET all USERS with BRAND ID
router.get('/b/:id', (req, res) => {
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

// GET all BRANDS with USER ID
router.get('/b/user/:id', (req, res) => {
    const { id } = req.params;
    db.findBrandByUser(id)
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
router.post('/b/:user/:brand', async (req, res) => {
    try {
        const filter = {
            user_id: req.params.user,
            brand_id: req.params.brand
        }
        const checkExist = await db.findBrandFilter(filter.user_id, filter.brand_id);
        if (!checkExist) {
            try {
                const filterId = await db.addBrandFilter(filter);
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
router.delete('/b/:user/:brand', (req, res) => {
    db.removeBrandFilter(req.params.user, req.params.brand)
        .then(count => {
            if (count < 1) {
                res.status(404).json({ messsage: 'that user does not have that brand filter set' });
            } else {
                res.status(200).json({ message: 'that brand filter has been removed' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error deleting filter', err });
        });
});


/*

DISPENSARY FILTER ROUTES

*/

// GET all DISPENSARY filters
router.get('/d', (req, res) => {
    db.findDispensaries()
        .then(filters => {
            res.status(200).json(filters);
        })
        .catch(err => res.status(500).json(err));
});

// GET all USERS with DISPENSARY ID
router.get('/d/:id', (req, res) => {
    const { id } = req.params;
    db.findByDisp(id)
        .then(users => {
            if (users) {
                res.status(200).json(users);
            } else {
                res.status(404).json({ message: 'no users found for that dispensary' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'failed to connect to the server', error: err });
        });
});

// GET all DISPENSARIES with USER ID
router.get('/d/user/:id', (req, res) => {
    const { id } = req.params;
    db.findDispByUser(id)
        .then(dispensaries => {
            if (dispensaries) {
                res.status(200).json(dispensaries);
            } else {
                res.status(404).json({ message: 'no dispensaries found for that user' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'failed to connect to the server', error: err });
        });
});

// POST (create) DISPENSARY filter to USER ID
router.post('/d/:user/:dispensary', async (req, res) => {
    try {
        const filter = {
            user_id: req.params.user,
            dispensary_id: req.params.dispensary
        }
        const checkExist = await db.findDispFilter(filter.user_id, filter.dispensary_id);
        if(!checkExist) {
            try {
                const filterId = await db.addDispFilter(filter);
                res.status(201).json(filterId);
            } catch (error) {
                res.status(404).json({ error: 'user already has dispensary filtered' });
            }
        } else {
            res.status(200).json({ error: 'filter already exist' });
        }
    } catch (error) {
        let message = 'error creating the filter';
        res.status(500).json({ message, error });
    }
});

// DELETE DISPENSARY filter by USER ID
router.delete('/d/:user/:dispensary', (req, res) => {
    db.removeDispFilter(req.params.user, req.params.dispensary)
        .then(count => {
            if (count < 1) {
                res.status(404).json({ message: 'that user does not have that dispensary filter set' });
            } else {
                res.status(200).json({ message: 'that dispensary filter has been removed' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error deleting filter', err });
        });
});


module.exports = router;