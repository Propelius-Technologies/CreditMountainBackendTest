import express from 'express';
import authMiddleware from '../middleware/authMiddlware';
import ParentController from '../controllers/parent.controller';
import parentVld from '../validators/userValidator';

const router = express.Router();

const parentController = new ParentController();

router.post('/', parentVld.addParentVld, parentController.addParent);
router.post('/login', parentVld.loginVld, parentController.login);
router.get('/', authMiddleware.verifyToken, parentController.getParent);
router.put('/', authMiddleware.verifyToken, parentVld.updateParentVld, parentController.updateParent);

export default router;
