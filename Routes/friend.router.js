const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Friend = require('../models/Friend');
const bcrypt = require('bcrypt');

  // Récupère tous les amis
router.get('/', async (req, res) => {
    try {
        const friends = await Friend.find();
        res.json(friends);
    } catch (err) {
        res.json({ message: err});
    }
});
// Récupère UN Friend
router.get('/:id', async (req, res) => {
    try {
        const friendId = req.params.id
        const friend = await Friend.findById(friendId);
        res.json(friend);
    } catch (err) {
        res.json({ message: 'error' + err });
    }
});
// Ajout d'un Ami (user)
router.post('/', async (req, res) => {
    // je hash le mot de passe
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            throw err
        };
        req.body.password = hash;
           const friend = new Friend(req.body)
        // const friend = new Friend({
        //     login: req.body.login,
        //     password: req.body.password,
        //     age: req.body.age,
        //     family: req.body.family,
        //     race: req.body.race,
        //     food: req.body.food
        // });
        console.log(friend)
        try {
            const saveFriend = friend.save();
            res.json(saveFriend);
            console.log(saveFriend)
        }
        catch (err) {
            res.json({ message: err });
        }
    });

});

// DELETE FRIEND
router.delete('/:id', async(req, res)=>{
    
    try {
        const friendId = req.params.id;
        // const friendId = Friend.id;
        // console.log(friendId)
        const removeFriend = await Friend.deleteMany({_id: friendId},  res.json({message: "Ami supprimé"}));
            //  res.json(removeFriend)
            
    } catch (err) {
        res.json({ message: "err" + err});
     }
        
})
    
 module.exports = router;