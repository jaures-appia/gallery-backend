const Photo = require('../models/Photo')
const fs = require('fs')

exports.addPhoto = (req, res, next) => {
    // console.log(req.body, req.file)
    
    const photo = new Photo({
        title: req.body.title,
        description: req.body.description,
        UserId: req.body.UserId,
        photoUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    photo.save()
        .then((photo) => res.status(201).json({ photo: photo }))
        .catch(error => res.status(401).json({ error })); 
}

exports.getAllPhotos = (req, res, next) => {
    Photo.find().sort({created_at:-1})
      .then((photos) => {
        res.status(201).json(photos)
      })
      .catch(error => res.status(401).json({ error }))
}

exports.getOnePhoto = (req, res, next) => {
    Photo.findOne({ _id: req.params.id })
      .then((photo) => {
        res.status(201).json(photo)
      })
      .catch(error => res.status(401).json({ error }))
}

exports.modifyPhoto = (req, res, next) => {
  // console.log(req.body)
  // console.log(req.file)
  const photo = req.file ?
     new Photo({
        _id: req.params.id,
        title: req.body.title,
        photoUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        description: req.body.description,
        UserId: req.body.UserId,
    })
     : new Photo({
      _id: req.params.id,
      title: req.body.title,
      photoUrl: req.body.photoUrl,
      description: req.body.description,
      UserId: req.body.UserId,
  })
  Photo.updateOne({ _id: req.params.id }, photo)
    .then(() => res.status(201).json({ message: 'photo modifié !'}))
    .catch(error => res.status(401).json({ error }));
}

exports.deletePhoto = (req, res, next) => {
  Photo.findOne({ _id: req.params.id })
    .then(photo => {
      // console.log(photo)
      const filename = photo.photoUrl.split('/images/')[1];
      // console.log(photo.photoUrl.split('/images/'))
      fs.unlink(`images/${filename}`, () => {
        Photo.deleteOne({ _id: req.params.id })
          .then(() => res.status(201).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(401).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
}