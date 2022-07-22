const router = require('express').Router();
const { param } = require('express-validator');
const validation = require('../handlers/validation');
const tokenHandler = require('../handlers/tokenHandler');
const boardController = require('../controllers/boardController');

router.post('/', tokenHandler.verifyToken, boardController.create);
router.get('/', tokenHandler.verifyToken, boardController.getAll);
router.get(
  '/favourites',
  tokenHandler.verifyToken,
  boardController.getFavourites,
);
router.put('/', tokenHandler.verifyToken, boardController.updatePosition);
router.put(
  '/favourites',
  tokenHandler.verifyToken,
  boardController.updateFavouritePosition,
);
router.get(
  '/:boardId',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value)) return Promise.reject('Invalid Id');
    return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  boardController.getOne,
);
router.put(
  '/:boardId',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value)) return Promise.reject('Invalid Id');
    return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  boardController.update,
);

router.delete(
  '/:boardId',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value)) return Promise.reject('Invalid Id');
    return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  boardController.delete,
);

module.exports = router;
