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
    const table = `brand_${req.params.list}`;
    const checkUser = await db.checkUser(req.body.user_id);
    if (checkUser) {
        try {
            console.log(checkUser);
        } catch (error) {
            console.log('no such user')
        }
    }
    // const entryData = req.body;
    // const table = `brand_${req.params.list}`;
    // const checker = await verify.confirmTable(table);
    // if (checker) {
    //     res.status(200).json({ message: `user: ${entry.user_id}, brand: ${entry.brand_id}` })
    // } else {
    //     res.status(404).json({ error: `could not find table named ${table}`})
    // }
})

module.exports = router;