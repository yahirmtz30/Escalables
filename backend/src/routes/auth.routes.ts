import { Router, Request, Response } from 'express';
import * as authController from '../controllers/auth.controller';

const router = Router();

// Rutas de autenticación
router.post('/registro', async (req: Request, res: Response) => {
    return await authController.registro(req, res);
});

router.post('/login', async (req: Request, res: Response) => {
    return await authController.login(req, res);
});

export default router;
