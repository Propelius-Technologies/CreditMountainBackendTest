import express from 'express';
import authMiddlware from '../middleware/authMiddlware';
import parentVld from '../validators/userValidator';
import childCtrl from '../controllers/child.controller';

const router = express.Router();

router.post('/', authMiddlware.verifyToken, parentVld.addChild, childCtrl.addChildCtrl);
router.get('/', authMiddlware.verifyToken, childCtrl.getAllChildCtrl);
router.get('/:id', authMiddlware.verifyToken, childCtrl.getSingleChildCtrl);
router.put('/:id', authMiddlware.verifyToken, parentVld.addChild, childCtrl.updateChildCtrl);
router.delete('/:id', authMiddlware.verifyToken, childCtrl.deleteChildCtrl);

export default router;
