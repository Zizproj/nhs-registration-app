const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

router.get('/', controller.getClientForm);
router.post('/client', controller.postClientRecord)
router.get('/client-list', controller.getClientList)

module.exports = router;
