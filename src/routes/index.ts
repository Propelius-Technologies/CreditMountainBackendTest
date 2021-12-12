import express from 'express';

import parentRoutes from './parent.routes';

import childRoutes from './child.routes';

const router = express.Router();

router.use('/parent', parentRoutes);

router.use('/child', childRoutes);

export default router;
