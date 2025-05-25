import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoURI = 'mongodb://localhost:27017/proyecto';
    console.log('Intentando conectar a MongoDB en:', mongoURI);

    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout de 5 segundos
      socketTimeoutMS: 45000, // Timeout de socket de 45 segundos
    });

    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB conectado exitosamente');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Error en la conexión de MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🔌 MongoDB desconectado');
    });

    // Manejar el cierre de la aplicación
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('Conexión a MongoDB cerrada por finalización de la aplicación');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Error al conectar con MongoDB:', error);
    process.exit(1);
  }
};
