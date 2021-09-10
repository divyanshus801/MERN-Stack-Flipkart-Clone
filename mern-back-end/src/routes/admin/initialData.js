const express = require('express');
const { requireSignin, adminMiddleware } = require('../../common-middleware');
const { initialData } = require('../../controller/admin/initialData');
const router = express.Router();


router.post('/initialdata', requireSignin,initialData);



module.exports = router;