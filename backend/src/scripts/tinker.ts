import { connectDB } from '../config/database';
import Usuario from '../models/usuario';
import bcrypt from 'bcryptjs';
import repl from 'repl';
import mongoose from 'mongoose';

// Conectar a la base de datos
connectDB().then(() => {
  console.log('✅ Conectado a MongoDB');

  // Funciones helper
  const helpers = {
    // Crear un usuario administrador
    async crearAdmin() {
      const salt = await bcrypt.genSalt(10);
      const usuario = new Usuario({
        nombre: 'Admin',
        apellidos: 'Principal',
        correo: 'admin@gym.com',
        contrasena: await bcrypt.hash('admin123', salt),
        telefono: '1234567890',
        direccionEnvio: {
          calle: 'Calle Admin',
          codigoPostal: '12345',
          ciudad: 'Ciudad Admin',
          estado: 'Estado Admin',
          pais: 'País Admin'
        },
        rol: 'admin',
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
      });
      return await usuario.save();
    },

    // Crear un usuario cliente normal
    async crearCliente() {
      const salt = await bcrypt.genSalt(10);
      const usuario = new Usuario({
        nombre: 'Cliente',
        apellidos: 'Normal',
        correo: 'cliente@gym.com',
        contrasena: await bcrypt.hash('cliente123', salt),
        telefono: '0987654321',
        direccionEnvio: {
          calle: 'Calle Cliente',
          codigoPostal: '54321',
          ciudad: 'Ciudad Cliente',
          estado: 'Estado Cliente',
          pais: 'País Cliente'
        },
        rol: 'cliente',
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
      });
      return await usuario.save();
    },

    // Crear un usuario premium
    async crearPremium() {
      const salt = await bcrypt.genSalt(10);
      const usuario = new Usuario({
        nombre: 'Cliente',
        apellidos: 'Premium',
        correo: 'premium@gym.com',
        contrasena: await bcrypt.hash('premium123', salt),
        telefono: '5555555555',
        direccionEnvio: {
          calle: 'Calle Premium',
          codigoPostal: '99999',
          ciudad: 'Ciudad Premium',
          estado: 'Estado Premium',
          pais: 'País Premium'
        },
        rol: 'premium',
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
      });
      return await usuario.save();
    },

    // Listar todos los usuarios
    async listarUsuarios() {
      return await Usuario.find({}, { contrasena: 0 });
    },

    // Buscar usuario por correo
    async buscarPorCorreo(correo: string) {
      return await Usuario.findOne({ correo }, { contrasena: 0 });
    },

    // Eliminar usuario por correo
    async eliminarPorCorreo(correo: string) {
      return await Usuario.deleteOne({ correo });
    },

    // Eliminar todos los usuarios
    async eliminarTodos() {
      return await Usuario.deleteMany({});
    },

    // Ayuda
    help() {
      console.log(`
Comandos disponibles:
- await helpers.crearAdmin()          // Crea un usuario administrador
- await helpers.crearCliente()        // Crea un usuario cliente normal
- await helpers.crearPremium()        // Crea un usuario cliente premium
- await helpers.listarUsuarios()      // Lista todos los usuarios
- await helpers.buscarPorCorreo('correo@ejemplo.com')  // Busca usuario por correo
- await helpers.eliminarPorCorreo('correo@ejemplo.com') // Elimina usuario por correo
- await helpers.eliminarTodos()       // Elimina todos los usuarios
- helpers.help()                      // Muestra esta ayuda
- .exit                              // Salir del tinker

Credenciales de ejemplo:
Admin    -> correo: admin@gym.com,    password: admin123
Cliente  -> correo: cliente@gym.com,  password: cliente123
Premium  -> correo: premium@gym.com,  password: premium123
      `);
    }
  };

  // Crear el REPL
  const replServer = repl.start({
    prompt: 'gym-tinker > ',
    useColors: true
  });

  // Agregar los helpers al contexto
  replServer.context.helpers = helpers;
  replServer.context.Usuario = Usuario;

  // Mostrar la ayuda al inicio
  helpers.help();

  // Cerrar la conexión al salir
  replServer.on('exit', () => {
    mongoose.disconnect();
    console.log('👋 ¡Hasta luego!');
  });

}).catch(error => {
  console.error('Error al conectar a la base de datos:', error);
  process.exit(1);
});
