const router = require('express').Router({ mergeParams: true });
const validation = require('../handlers/validation');
const tokenHandler = require('../handlers/tokenHandler');
const taskController = require('../controllers/taskController');
const { param, body } = require('express-validator');

router.post(
  '/',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value))
      return Promise.reject('Invalid Board ID');
    return Promise.resolve();
  }),
  body('sectionId').custom((value) => {
    if (!validation.isObjectId(value))
      return Promise.reject('Invalid Section ID');
    return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.create,
);

router.put(
  '/update-position',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value))
      return Promise.reject('Invalid Board ID');
    return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.updatePosition,
);
router.put(
  '/:taskId',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value))
      return Promise.reject('Invalid Board ID');
    return Promise.resolve();
  }),
  param('taskId').custom((value) => {
    if (!validation.isObjectId(value)) return Promise.reject('Invalid Task ID');
    return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.update,
);
router.delete(
  '/:taskId',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value))
      return Promise.reject('Invalid Board ID');
    return Promise.resolve();
  }),
  param('taskId').custom((value) => {
    if (!validation.isObjectId(value)) return Promise.reject('Invalid Task ID');
    return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.delete,
);

module.exports = router;
