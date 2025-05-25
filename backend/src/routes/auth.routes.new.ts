import { Router, RequestHandler } from 'express';
import * as authController from '../controllers/auth.controller';

const router = Router();

// Rutas de autenticación
const registro: RequestHandler = (req, res) => {
    authController.registro(req, res);
};

const login: RequestHandler = (req, res) => {
    authController.login(req, res);
};

router.post('/registro', registro);
router.post('/login', login);

export default router;
