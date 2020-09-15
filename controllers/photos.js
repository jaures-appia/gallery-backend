const Photo = require('../models/Photo')

exports.addPhoto = (req, res, next) => {
    console.log(req.body)
    // const photo = new Photo({
    //     title: req.body.title,
    //     photoUrl: req.body.photoUrl,
    //     description: req.body.description,
    //     UserId: req.body.UserId,
    // });
    // photo.save()
    //     .then((photo) => res.status(201).json({ photo: photo }))
    //     .catch(error => res.status(401).json({ error }));

    // const photoObject = req.body.photo
    // delete photoObject._id;
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
    const photo = new Photo({
        _id: req.params.id,
        title: req.body.title,
        photoUrl: req.body.photoUrl,
        description: req.body.description,
        UserId: req.body.UserId,
    })
    Photo.updateOne({_id: req.params.id}, photo)
        .then(() => {
            res.status(201).json({
            message: 'Photo updated successfully!'
            });
        })
        .catch((error) => {
            res.status(400).json({
            error: error
            });
        })
}

exports.deletePhoto = (req, res, next) => {
    Photo.deleteOne({_id: req.params.id})
    .then(() => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch((error) => {
        res.status(400).json({
          error: error
        })
      })
}