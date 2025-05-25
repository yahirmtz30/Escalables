import { Router, Request, Response, NextFunction } from 'express';
import { productoController } from '../controllers/producto.controller';

const router = Router();

// Middleware para manejar errores
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Rutas
router.get('/', asyncHandler(productoController.getProductos));
router.get('/:id', asyncHandler(productoController.getProductoPorId));
router.get('/relacionados/:categoria', asyncHandler(productoController.getProductosRelacionados));
router.post('/', asyncHandler(productoController.crearProducto));
router.put('/:id', asyncHandler(productoController.actualizarProducto));
router.delete('/:id', asyncHandler(productoController.eliminarProducto));

export default router;
