import express from 'express';
import authMiddleware from '../middleware/auth.middleware';
import TransactionController from '../controllers/transaction.controller';
import TransactionsValidator from '../validators/transactions.validator';

const router = express.Router();

const transactionController = new TransactionController();
const transactionValidator = new TransactionsValidator();

router.post(
  '/:cardId/transactions',
  authMiddleware.verifyToken,
  transactionValidator.createCharge(),
  transactionController.createCharge,
);
router.get(
  '/:cardId/transactions',
  authMiddleware.verifyToken,
  transactionController.getAllTransactions,
);
router.get(
  '/:cardId/transactions/:transactionId',
  authMiddleware.verifyToken,
  transactionController.getTransaction,
);

export default router;
