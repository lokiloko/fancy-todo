const express = require('express');
const router = express.Router();
const TodoCtrl = require('../controllers/todo');

router.get('/:user_id', TodoCtrl.read);
// router.get('/:id', TodoCtrl.readOne);
router.post('/:id', TodoCtrl.starred);
router.post('/', TodoCtrl.create);
router.put('/:id', TodoCtrl.update);
router.post('/star/:id', TodoCtrl.starred);
router.post('/finished/:id', TodoCtrl.finished);
router.delete('/:id', TodoCtrl.delete);

module.exports = router;
