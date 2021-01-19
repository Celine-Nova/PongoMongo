const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Friend = require('../models/Friend');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authVerifyToken');


// Récupère tous les utilisateurs
router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});
// Récupère UN utilisateur
router.get('/:id', async (req, res) => {
    try {
        // je récupère l'utilisateur par son Id
        const userId = req.params.id
        // je selectionne certains champs de cet utilisateur
        // SOLUTION 1
        // const user = await User.findById(userId,"login age family food friends")

        // SOLUTION 2   ENLEVER LE CHAMP QUE L'ON NE VEUT PAS AVEC LE -
        const user = await User.findById(userId,"-password")

        // SOLUTION 3
        // .select(login)
        // .select('age')
        // .select('family')
        // .select('food')
        // .select('friends')
        res.json(user);
    } catch (err) {
        res.json({ message: 'error' + err });
    }
});
// Ajout d'un pangolin (user)
router.post('/', async (req, res) => {
    // je hash le mot de passe
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            throw err
        };
        req.body.password = hash;
        //    const user = new User(req.body)
        const user = new User({
            login: req.body.login,
            password: req.body.password,
            age: req.body.age,
            family: req.body.family,
            race: req.body.race,
            food: req.body.food
        });
        const friend = new Friend(req.body)
            // login: req.body.login,
            // password: req.body.password,
            // age: req.body.age,
            // family: req.body.family,
            // race: req.body.race,
            // food: req.body.food
        // });
        console.log(user)
        try {
            const saveUser = user.save();
            const saveFriend = friend.save();
            res.json(saveUser);
            console.log(saveUser)
        }
        catch (err) {
            res.json({ message: err });
        }
    });

});
// Ajout d'un ami à l'utilisateur
router.post('/:id/friend', async (req, res) => {
    // je récupère id utilisiateur dans les parametre url
    const userId = req.params.id
    const friend = new Friend(req.body)
    const user = await User.findById(userId)
    user.friends.push(friend);
    // await friend.save();
    // friend.user = user
    
    
     try{   
        const updateUserId = User.findByIdAndUpdate(
            // l'id de l'utilisateur
            {userId},
            // je push le id friend dans le tableau friends de 'lutilisateur
            {$push: {friends:friend}}
            )
            await user.save();
            console.log(updateUserId)
            res.json({ message: 'ami ajouté' })
     }
      catch(err) {
             res.json({ message: "error" + err});
     }
 });
// LOGIN
router.post('/login', async (req, res) =>{
    // je récupère l'utilisateur par son login
    User.findOne({login: req.body.login})
        .then(user => {
            if (user) {
                // je compare le mot de passe hashé de connexion au mot de passe de la bdd
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) return res.status(500).json(error)
                    else {
                        if (result) {
                            //on encode les données à l'interieur du token (id, login)
                            const token = jwt.sign({ id: user.id, login: user.login }, process.env.SECRET_PHRASE, { expiresIn: '10d' })

                            res.status(200).json({
                                token: token
                            })
                        }
                        else {
                            return res.json({ message: 'FAIL' })
                        }
                    }
                })
            } else {
                res.status(404).json({ message: 'bad login and or password' })
            }
        })
        .catch(error => {
            res.status(500).json(error);
        })
})
// Edit user
router.put('/:id', async (req, res) => {

    const userId = req.params.id;
    const user = req.body;

    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
            throw err
        }
        try {
            if (req.body.password) {
                user.password = await hash;
            }
            const update = await User.findOneAndUpdate(userId, user, { rawResult: true, useFindAndModify: false })
            console.log(update)
            res.json({ message: 'type updated' })
        }
        catch (err) {
            res.json({ message: err });
        }
    })
})


module.exports = router;