import express from 'express';
import authMiddleware from '../middleware/auth.middleware';
import parentVld from '../validators/userValidator';
import ChildController from '../controllers/child.controller';

const router = express.Router();

const childController = new ChildController();

router.post('/', authMiddleware.verifyToken, parentVld.addChild, childController.createChild);
router.get('/', authMiddleware.verifyToken, childController.getAllChildren);
router.get('/:id', authMiddleware.verifyToken, childController.getChild);
router.put('/:id', authMiddleware.verifyToken, parentVld.addChild, childController.updateChildCtrl);
router.delete('/:id', authMiddleware.verifyToken, childController.deleteChild);

export default router;
