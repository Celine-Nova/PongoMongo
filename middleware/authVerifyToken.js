const jwt = require('jsonwebtoken');
//Je vérifie les tokens

module.exports = function(req, res, next) {
    if(req.headers.authorization){
    const token = req.headers.authorization.split(" ")[1]
    try {
        // on verifie par rapport à la phrase secrète 
        // decoded permet de decoder les proprietés assigné au token
        jwt.verify(token, process.env.SECRET_PHRASE, function(err, decoded){
          if(!err){
            next();
            console.log(decoded.id);
          }
          else {
            console.log(err)
            // token invalide
            res.status(401).json({ message: "Token invalide"});
          }
        });
      
      // jwt probleme requete ne fonctionne pas
    } catch (error) {
      res.status(401).json({ message: "requete non authentifiée"});
    }
  }
  // jwt n'est pas renseigné
    else{
      res.status(401).json({ message: "Authentication Fail"});
    }
}
