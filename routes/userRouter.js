const express = require('express');

const db = require('../data/models/users_model')

const router = express.Router();


router.get('/', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => res.status(500).json(err))
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'user not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'failed to connnect to server', error: err});
        });
});

router.post('/', async (req, res) => {
    try {
        const userData = req.body;
        const checkEmail = await db.findByEmail(userData.email);
        if(!checkEmail) {
            try {
                const userId = await db.add(userData);
                res.status(201).json(userId);
            } catch (error) {
                res.status(500).json({ error: 'unable to add user to database'})
            }
        } else {
            res.status(200).json(checkEmail);
        }
    } catch (error) {
        let message = 'error creating the user';
        res.status(500).json({ message, error });
    }
});

router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
        .then(count => {
            if (count < 1) { 
                res.status(404).json({ message: 'that user id is unknown' });
            } else {
                res.status(200).json({ message: 'user has been deleted' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error deleting user', err });
        });
});

module.exports = router;