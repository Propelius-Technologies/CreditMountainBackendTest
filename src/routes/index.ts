import express from 'express';
import parentRoutes from './parent.routes';
import childRoutes from './child.routes';
import cardRoutes from './card.routes';
import transactionRoutes from './transaction.routes';

const router = express.Router();

router.use('/parent', parentRoutes);
router.use('/child', childRoutes);
router.use('/child', cardRoutes);

router.use('/cards', transactionRoutes);

export default router;
