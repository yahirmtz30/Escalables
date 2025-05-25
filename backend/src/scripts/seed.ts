import mongoose from 'mongoose';
import { connectDB } from '../config/database';
import Producto from '../models/producto';

const productos = [
  {
    nombre: "Proteína Whey Gold Standard",
    descripcion: "Proteína de suero de leche de alta calidad",
    precio: 1299.99,
    categoria: "Suplementos",
    tipo: "Proteína",
    marca: "Optimum Nutrition",
    sabor: "Chocolate",
    ingredientes: ["Proteína de suero de leche", "Cacao", "Stevia"],
    imagenes: ["https://example.com/protein1.jpg"],
    stock: 50,
    activo: true,
    fechaCreacion: new Date(),
    fechaActualizacion: new Date()
  },
  {
    nombre: "Pre-workout C4",
    descripcion: "Energía y concentración para tu entrenamiento",
    precio: 799.99,
    categoria: "Suplementos",
    tipo: "Pre-entreno",
    marca: "Cellucor",
    sabor: "Fruit Punch",
    ingredientes: ["Cafeína", "Beta-Alanina", "Creatina"],
    imagenes: ["https://example.com/preworkout1.jpg"],
    stock: 30,
    activo: true,
    fechaCreacion: new Date(),
    fechaActualizacion: new Date()
  },
  {
    nombre: "Mancuernas Ajustables",
    descripcion: "Set de mancuernas ajustables de 2.5 a 25kg",
    precio: 3499.99,
    categoria: "Equipamiento",
    tipo: "Pesas",
    marca: "Bowflex",
    imagenes: ["https://example.com/dumbbells1.jpg"],
    stock: 10,
    activo: true,
    fechaCreacion: new Date(),
    fechaActualizacion: new Date()
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    
    // Limpiar la colección existente
    await Producto.deleteMany({});
    console.log('🧹 Base de datos limpiada');

    // Insertar los nuevos productos
    await Producto.insertMany(productos);
    console.log('✅ Productos insertados exitosamente');

    // Cerrar la conexión
    await mongoose.connection.close();
    console.log('📦 Base de datos poblada y conexión cerrada');
    
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
    process.exit(1);
  }
};

seedDB();
