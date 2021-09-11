import { Router } from 'express';
import { authenticate, register } from '../controllers/user';

const router: Router = Router();

router.post('/authenticate', authenticate);
router.post('/register', register);

export default router;
