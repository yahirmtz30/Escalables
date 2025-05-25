import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_jwt';

export const registro = async (req: Request, res: Response) => {
  try {
    const { nombre, apellidos, correo, contrasena, telefono, direccionEnvio, rol = 'cliente' } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const contrasenaHash = await bcrypt.hash(contrasena, salt);

    // Crear nuevo usuario
    const usuario = new Usuario({
      nombre,
      apellidos,
      correo,
      contrasena: contrasenaHash,
      telefono,
      direccionEnvio,
      rol
    });

    await usuario.save();

    // Generar JWT
    const token = jwt.sign(
      { 
        id: usuario._id,
        correo: usuario.correo,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Enviar respuesta sin incluir la contraseña
    const { contrasena: _, ...usuarioSinContrasena } = usuario.toObject();

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      usuario: usuarioSinContrasena
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { correo, contrasena } = req.body;

    // Buscar usuario
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!contrasenaValida) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar JWT
    const token = jwt.sign(
      { 
        id: usuario._id,
        correo: usuario.correo,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Enviar respuesta sin incluir la contraseña
    const { contrasena: _, ...usuarioSinContrasena } = usuario.toObject();

    res.json({
      message: 'Login exitoso',
      token,
      usuario: usuarioSinContrasena
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
