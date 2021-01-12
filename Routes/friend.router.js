const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Friend = require('../models/User');
  // Ajout du ami
  router.post('/:id/friend', async (req, res) => {
    // je récupère id utilisiateur dans les parametre url
    const userId = req.params.id;
    //  Je ais chercher l'utilisateur dans la bd
   await User.findById(userId);
   //je cree un nouvel ami parmis les utilisateur
     const friend = new User(req.body); 
    // j'assigne cet ami au id de lutilisateur
     friend.friend = userId
     console.log(userId)
     console.log(friend)
     try{   
         const saveFriend = await friend.save();
         res.json(saveFriend);
         console.log(saveUser)
     }
      catch(err) {
             res.json({ message: err});
     }
 });
 module.exports = router;