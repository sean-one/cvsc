const express = require('express');

const db = require('../data/models/alert_model');

const router = express.Router();


/*

BRAND ALERT ROUTES

*/

// GET all BRAND alerts
router.get('/b', (req, res) => {
    db.findBrands()
        .then(alerts => {
            res.status(200).json(alerts);
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

// POST (create) BRAND alert to USER ID
router.post('/b/:user/:brand', async (req, res) => {
    try {
        const alert = {
            user_id: req.params.user,
            brand_id: req.params.brand
        }
        const checkExist = await db.findBrandAlert(alert.user_id, alert.brand_id);
        if (!checkExist) {
            try {
                const alertId = await db.addBrandAlert(alert);
                res.status(201).json(alertId);
            } catch (error) {
                res.status(404).json({ error: 'user already has brand alert' });
            }
        } else {
            res.status(200).json({ error: 'alert already exist' });
        }
    } catch (error) {
        let message = 'error creating the alert';
        res.status(500).json({ message, error });
    }
});

// DELETE BRAND alert by USER ID
router.delete('/b/:user/:brand', (req, res) => {
    db.removeBrandAlert(req.params.user, req.params.brand)
        .then(count => {
            if (count < 1) {
                res.status(404).json({ messsage: 'that user does not have that brand alert set' });
            } else {
                res.status(200).json({ message: 'that brand alert has been removed' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error deleting alert', err });
        });
});


/*

DISPENSARY ALERT ROUTES

*/

// GET all DISPENSARY alerts
router.get('/d', (req, res) => {
    db.findDispensaries()
        .then(alerts => {
            res.status(200).json(alerts);
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

// POST (create) DISPENSARY alert to USER ID
router.post('/d/:user/:dispensary', async (req, res) => {
    try {
        const alert = {
            user_id: req.params.user,
            dispensary_id: req.params.dispensary
        }
        const checkExist = await db.findDispAlert(alert.user_id, alert.dispensary_id);
        if (!checkExist) {
            try {
                const alertId = await db.addDispAlert(alert);
                res.status(201).json(alertId);
            } catch (error) {
                res.status(404).json({ error: 'user already has dispensary alert set' });
            }
        } else {
            res.status(200).json({ error: 'alert already exist' });
        }
    } catch (error) {
        let message = 'error creating the alert';
        res.status(500).json({ message, error });
    }
});

// DELETE DISPENSARY alert by USER ID
router.delete('/d/:user/:dispensary', (req, res) => {
    db.removeDispAlert(req.params.user, req.params.dispensary)
        .then(count => {
            if (count < 1) {
                res.status(404).json({ message: 'that user does not have that dispensary alert set' });
            } else {
                res.status(200).json({ message: 'that dispensary alert has been removed' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error deleting alert', err });
        });
});


/*

EVENT ALERT ROUTES

*/

// GET all EVENT alerts
router.get('/e', (req, res) => {
    db.findEvents()
        .then(alerts => {
            res.status(200).json(alerts);
        })
        .catch(err => res.status(500).json(err));
});

// GET all USERS with EVENT ID
router.get('/e/:id', (req, res) => {
    const { id } = req.params;
    db.findByEvent(id)
        .then(users => {
            if (users) {
                res.status(200).json(users);
            } else {
                res.status(404).json({ message: 'no users found for that event' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'failed to connect to the server', error: err });
        });
});

// GET all EVENT with USER ID
router.get('/e/user/:id', (req, res) => {
    const { id } = req.params;
    db.findEventByUser(id)
        .then(events => {
            if (events) {
                res.status(200).json(events);
            } else {
                res.status(404).json({ message: 'no events found for that user' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'failed to connect to the server', error: err });
        });
});

// POST (create) EVENT alert to USER ID
router.post('/e/:user/:event', async (req, res) => {
    try {
        const alert = {
            user_id: req.params.user,
            event_id: req.params.event
        }
        const checkExist = await db.findEventAlert(alert.user_id, alert.event_id);
        if (!checkExist) {
            try {
                const alertId = await db.addEventAlert(alert);
                res.status(201).json(alertId);
            } catch (error) {
                res.status(404).json({ error: 'user already has event alert set' });
            }
        } else {
            res.status(200).json({ error: 'alert already exist' });
        }
    } catch (error) {
        let message = 'error creating the alert';
        res.status(500).json({ message, error });
    }
});

// DELETE EVENT alert by USER ID
router.delete('/e/:user/:event', (req, res) => {
    db.removeEventAlert(req.params.user, req.params.event)
        .then(count => {
            if (count < 1) {
                res.status(404).json({ message: 'that user does not have that event alert set' });
            } else {
                res.status(200).json({ message: 'that event alert has been removed' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error deleting alert', err });
        });
});


module.exports = router;