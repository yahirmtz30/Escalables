import { Schema, model } from 'mongoose';

export interface IUsuario {
  nombre: string;
  apellidos: string;
  correo: string;
  contrasena: string;
  telefono?: string;
  direccionEnvio: {
    calle: string;
    codigoPostal: string;
    ciudad: string;
    estado: string;
    pais: string;
  };
  rol: 'admin' | 'cliente' | 'premium';
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

const usuarioSchema = new Schema<IUsuario>({
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  telefono: { type: String },
  direccionEnvio: {
    calle: { type: String, required: true },
    codigoPostal: { type: String, required: true },
    ciudad: { type: String, required: true },
    estado: { type: String, required: true },
    pais: { type: String, required: true }
  },
  rol: { type: String, enum: ['admin', 'cliente', 'premium'], default: 'cliente' },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now }
});

export default model<IUsuario>('Usuario', usuarioSchema);
