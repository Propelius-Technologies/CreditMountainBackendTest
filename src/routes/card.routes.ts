import express from 'express';
import authMiddlware from '../middleware/authMiddlware';
import parentVld from '../validators/userValidator';
import CardController from '../controllers/card.controller';

const router = express.Router();

const cardController = new CardController();

router.post('/', authMiddlware.verifyToken, parentVld.addChild, cardController.createCard);
router.get('/', authMiddlware.verifyToken, cardController.getAllCards);
router.get('/:cardId', authMiddlware.verifyToken, cardController.getCard);
router.put('/:cardId', authMiddlware.verifyToken, parentVld.addChild, cardController.updateCard);
router.delete('/:cardId', authMiddlware.verifyToken, cardController.deleteCard);

export default router;
