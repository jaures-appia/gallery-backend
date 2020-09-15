const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash,
          username: req.body.username,
          avatar: req.body.avatar,
        });
        user.save()
          .then((user) => res.status(201).json({ user: user }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.getOneUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      res.status(201).json(user)
    })
    .catch(error => res.status(401).json({ error }))
}

exports.getAllUsers = (req, res, next) => {
  User.find().sort({created_at:-1})
    .then((users) => {
      res.status(201).json(users)
    })
    .catch(error => res.status(401).json({ error }))
}

exports.modifyUser = (req, res, next) => {

  User.findOne({ _id: req.params.id })
      .then(data => {
        if (!data) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        
        if(data.password == req.body.password){
          let user = new User({
            _id: req.params.id,
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            avatar: req.body.avatar,
          })
          User.updateOne({_id: req.params.id}, user)
          .then(() => {
              res.status(201).json({
                message: 'Thing updated successfully!'
              });
            })
          .catch(
          (error) => {
            res.status(401).json({
              error: error
            });
          })
        }else{
          bcrypt.hash(req.body.password, 10)
          .then(hash => {
            let user = new User({
              _id: req.params.id,
              email: req.body.email,
              password: hash,
              username: req.body.username,
              avatar: req.body.avatar,
            })
            User.updateOne({_id: req.params.id}, user)
          .then(() => {
              res.status(201).json({
                message: 'user updated successfully!'
              });
            })
          .catch(
          (error) => {
            res.status(401).json({
              error: error
            });
          })
          })
          .catch(error => res.status(500).json({ error }));
        }
      })
      .catch(error => res.status(500).json({ error }));

 
}

exports.desactivateUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then(data => {
      if (!data) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      // const user = new User({
      //   _id: req.params.id,
      //   email: data.email,
      //   password: hash,
      //   username: req.body.username,
      //   avatar: req.body.avatar,
      // })
      User.updateOne({_id: req.params.id}, {isActif: false})
      .then(() => {
          res.status(201).json({
            message: 'user desactivate successfully!'
          });
        })
      .catch(
      (error) => {
        res.status(401).json({
          error: error
        });
      })
      
    })
    .catch(error => res.status(500).json({ error }));
}

exports.activateUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then(data => {
      if (!data) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      
      User.updateOne({_id: req.params.id}, {isActif: true})
      .then(() => {
          res.status(201).json({
            message: 'user activate successfully!'
          });
        })
      .catch(
      (error) => {
        res.status(401).json({
          error: error
        });
      })
      
    })
    .catch(error => res.status(500).json({ error }));
}