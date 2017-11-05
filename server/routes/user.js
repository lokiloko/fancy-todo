const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/user')

router.post('/', UserCtrl.create)
router.get('/:id', UserCtrl.readOne)
router.get('/', UserCtrl.read)
router.put('/:id', UserCtrl.update)
router.delete('/:id', UserCtrl.delete)

module.exports = router;
