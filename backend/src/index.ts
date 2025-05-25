import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database';
import productoRoutes from './routes/producto.routes';
import authRoutes from './routes/auth.routes';

// Inicializar express
const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/productos', productoRoutes);
app.use('/api/auth', authRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
