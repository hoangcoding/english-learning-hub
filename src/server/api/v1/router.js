const express = require('express');
const userRoutes = require('./user/routes');
const lessonRoutes = require('./lesson/routes');

const router = express.Router();


/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));


/**
 * v1/user routes
 */
router.use('/user', userRoutes);

/**
 * v1/lesson routes
 */
router.use('/lesson', lessonRoutes);

module.exports = router;