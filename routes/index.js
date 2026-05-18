const router = require('express').Router();


//router.get('/', (req, res) => {res.send('Hello World!');});

router.use('/contacts', require('./contacts'));
router.use('/temples', require('./temples'));

module.exports = router;

