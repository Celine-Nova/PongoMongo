const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
// const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
 res.send('Bonjour je teste mongo');
});
// router.get('/', async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (err) {
//         res.json({ message: err});
//     }
// });
// Ajout d'un pangolin (user)
router.post('/', async (req, res) => {
    // bcrypt.hash(req.body.password, 10,(err, hash) => {
    //     if (err) {
    //         throw err
    //     };
    //     req.body.password = hash;
       
        const user = new User({
            login : req.body.login,
            password: req.body.password,
            age : req.body.age,
            family : req.body.family,
            race : req.body.race,
            food : req.body.food
        }); 
        try {
            const saveUser = await user.save();
            res.json(saveUser);
        }
         catch (err) {
                res.json({ message: 'error'});
        }
    });
// });

module.exports = router;