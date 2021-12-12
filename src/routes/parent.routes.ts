import express from 'express';
import authMiddlware from '../middleware/authMiddlware';
import parentCtrl from '../controllers/parent.controller';
import parentVld from '../validators/userValidator';

const router = express.Router();

router.post('/', parentVld.addParentVld, parentCtrl.addParentCtrl);
router.post('/login', parentVld.loginVld, parentCtrl.loginCtrl);
router.get('/', authMiddlware.verifyToken, parentCtrl.getParentCtrl);
router.put('/', authMiddlware.verifyToken, parentVld.updateParentVld, parentCtrl.updateParentCtrl);

export default router;
