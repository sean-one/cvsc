const express = require('express');

const db = require('../data/models/editor_model');

const router = express.Router();


/*

BRAND EDITOR ROUTES

*/

// GET all BRAND editors
router.get('/b', (req, res) => {
    db.findBrands()
        .then(editors => {
            res.status(200).json(editors);
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

// POST (create) BRAND editor to USER ID
router.post('/b/:user/:brand', async (req, res) => {
    try {
        const editor = {
            user_id: req.params.user,
            brand_id: req.params.brand
        }
        const checkExist = await db.findBrandEditor(editor.user_id, editor.brand_id);
        if (!checkExist) {
            try {
                const editorId = await db.addBrandEditor(editor);
                res.status(201).json(editorId);
            } catch (error) {
                res.status(404).json({ error: 'user is already an editor for that brand' });
            }
        } else {
            res.status(200).json({ error: 'editor already exist' });
        }
    } catch (error) {
        let message = 'error creating the editor';
        res.status(500).json({ message, error });
    }
});

// DELETE BRAND editor by USER ID
router.delete('/b/:user/:brand', (req, res) => {
    db.removeBrandEditor(req.params.user, req.params.brand)
        .then(count => {
            if (count < 1) {
                res.status(404).json({ messsage: 'that user does not editor permission' });
            } else {
                res.status(200).json({ message: 'that brand editor has been removed' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error deleting editor', err });
        });
});


/*

DISPENSARY EDITOR ROUTES

*/

// GET all DISPENSARY editors
router.get('/d', (req, res) => {
    db.findDispensaries()
        .then(editors => {
            res.status(200).json(editors);
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

// POST (create) DISPENSARY editor to USER ID
router.post('/d/:user/:dispensary', async (req, res) => {
    try {
        const editor = {
            user_id: req.params.user,
            dispensary_id: req.params.dispensary
        }
        const checkExist = await db.findDispEditor(editor.user_id, editor.dispensary_id);
        if (!checkExist) {
            try {
                const editorId = await db.addDispEditor(editor);
                res.status(201).json(editorId);
            } catch (error) {
                res.status(404).json({ error: 'user already has editor permissions set' });
            }
        } else {
            res.status(200).json({ error: 'editor already exist' });
        }
    } catch (error) {
        let message = 'error creating the editor';
        res.status(500).json({ message, error });
    }
});

// DELETE DISPENSARY editor by USER ID
router.delete('/d/:user/:dispensary', (req, res) => {
    db.removeDispEditor(req.params.user, req.params.dispensary)
        .then(count => {
            if (count < 1) {
                res.status(404).json({ message: 'that user does not have editor permission set for that dispensary' });
            } else {
                res.status(200).json({ message: 'that editor has been removed' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error deleting editor', err });
        });
});


/*

EVENT EDITOR ROUTES

*/

// GET all EVENT editors
router.get('/e', (req, res) => {
    db.findEvents()
        .then(editors => {
            res.status(200).json(editors);
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

// POST (create) EVENT editor to USER ID
router.post('/e/:user/:event', async (req, res) => {
    try {
        const editor = {
            user_id: req.params.user,
            event_id: req.params.event
        }
        const checkExist = await db.findEventEditor(editor.user_id, editor.event_id);
        if (!checkExist) {
            try {
                const editorId = await db.addEventEditor(editor);
                res.status(201).json(editorId);
            } catch (error) {
                res.status(404).json({ error: 'user already has event editor permission set' });
            }
        } else {
            res.status(200).json({ error: 'editor already exist' });
        }
    } catch (error) {
        let message = 'error creating the editor';
        res.status(500).json({ message, error });
    }
});

// DELETE EVENT editor by USER ID
router.delete('/e/:user/:event', (req, res) => {
    db.removeEventEditor(req.params.user, req.params.event)
        .then(count => {
            if (count < 1) {
                res.status(404).json({ message: 'that user does not have editor permission for that event set' });
            } else {
                res.status(200).json({ message: 'that event editor has been removed' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error deleting editor', err });
        });
});


module.exports = router;