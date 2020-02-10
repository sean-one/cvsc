const express = require('express');

const db = require('../data/models/ul_model');
const verify = require('../routes/verifiers');

const router = express.Router();

// GET all ALERTS, FILTER, EDITORS for all BRANDS, DISPENSARY, EVENTS
router.get('/:entity/:list', async (req, res) => {
    const table = `${req.params.entity}_${req.params.list}`
    const checker = await verify.confirmTable(table)
    if (checker) {
        db.findEntity(table)
            .then(userList => {
                res.status(200).json(userList);
            })
            .catch(err => res.status(500).json(err));
    } else {
        res.status(404).json({ messager: `could not find table titled ${table}` });
    }
});

// GET all USERS for specific BRAND, DISPENSARY, EVENTS, ALERT, FILTER, EDITORS
router.get('/:entity/:list/:id', async (req, res) => {
    const table = `${req.params.entity}_${req.params.list}`;
    const { id } = req.params;
    const query = `${req.params.entity}_id`;
    const checker = await verify.confirmTable(table);
    if (checker) {
        db.findEntityById(table, query, id)
            .then(users => {
                if (users) {
                    res.status(200).json(users);
                } else {
                    res.status(404).json({ message: `no users found for that ${req.params.entity}`})
                }
            })
            .catch(err => {
                res.status({ message: 'failed to connect to the server' });
            });
    } else {
        res.status(404).json({ message: `counld not find table titled ${table}` });
    }
});

// GET all BRAND, DISPENSARY, EVENT, ALERTS, FILTER, EDITORS for specific USER
router.get('/u/:entity/:list/:id', async (req, res) => {
    const table = `${req.params.entity}_${req.params.list}`;
    const { id } = req.params;
    const checker = await verify.confirmTable(table);
    if (checker) {
        db.findByUser(table, id)
            .then(userList => {
                if (userList.length > 0) {
                    res.status(200).json(userList);
                } else {
                    res.status(404).json({ message: `no ${req.params.entity} found for that user` });
                }
            })
            .catch(err => {
                res.status({ message: 'failed to connect to the server', err });
            })
    } else {
        res.status(404).json({ message: `could not find table title ${table}` });
    }
});

// POST (create) USER FILTER, ALERTS, EDITORS rows for BRAND
router.post('/create-brand/:list', async (req, res) => {
    // NEED TO ADD ERROR CHECKING FOR THE TABLE NAME
    // DOUBLE CHECK NETWORK STATUS ERROR CODES
    const table = `brand_${req.params.list}`;
    const entry = req.body;
    try {
        const checkUser = await db.checkUser(entry.user_id);
        const checkBrand = await db.checkBrand(entry.brand_id);
        const checkExist = await db.checkBrandExist(table, entry.user_id, entry.brand_id);
        if (!checkUser || !checkBrand) {
            res.status(404).json({ message: 'user or brand not found'});
        } else if (checkExist) {
            res.status(409).json({ message: 'that entry already exist' });
        } else {
            try {
                const newId = await db.addRow(table, entry);
                res.status(201).json(newId);
            } catch (error) {
                res.status(404).json({ message: 'error creating the entry' });

            }
        }
    } catch (error) {
        let message = 'error connecting to the server';
        res.status(500).json({ message, error });
    }
})

module.exports = router;