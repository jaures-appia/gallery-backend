const express = require('express');
const router = express.Router();

const multer = require('../middlewares/multer-config')
const photoCtrl = require('../controllers/photos')

router.post('/', multer, photoCtrl.addPhoto);
router.get('/', photoCtrl.getAllPhotos);
router.get('/:id', photoCtrl.getOnePhoto);
router.put('/:id', multer, photoCtrl.modifyPhoto);
router.delete('/:id', photoCtrl.deletePhoto);

module.exports = router;