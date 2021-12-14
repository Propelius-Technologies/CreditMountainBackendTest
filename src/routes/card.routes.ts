import express from 'express';
import authMiddleware from '../middleware/auth.middleware';
import CardController from '../controllers/card.controller';
import CardValidators from '../validators/card.validators';

const router = express.Router();

const cardController = new CardController();
const cardValidator = new CardValidators();

router.post(
  '/:childId/cards/',
  authMiddleware.verifyToken,
  cardValidator.addCard(),
  cardController.createCard,
);
router.get('/:childId/cards/', authMiddleware.verifyToken, cardController.getAllCards);
router.get('/:childId/cards/:cardId', authMiddleware.verifyToken, cardController.getCard);
router.put(
  '/:childId/cards/:cardId',
  authMiddleware.verifyToken,
  cardValidator.updateCard(),
  cardController.updateCard,
);
router.delete('/:childId/cards/:cardId', authMiddleware.verifyToken, cardController.deleteCard);

export default router;
