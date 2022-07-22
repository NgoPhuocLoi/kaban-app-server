var router = require('express').Router();

router.use('/auth', require('./authRoute'));
router.use('/board', require('./boardRoute'));
router.use('/board/:boardId/section', require('./sectionRoute'));
router.use('/board/:boardId/task', require('./taskRoute'));

module.exports = router;
