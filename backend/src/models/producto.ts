import { Schema, model } from 'mongoose';

export interface IProducto {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  tipo: string;
  marca: string;
  sabor?: string;
  ingredientes?: string[];
  imagenes: string[];
  stock: number;
  activo: boolean;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

const productoSchema = new Schema<IProducto>({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  categoria: { type: String, required: true },
  tipo: { type: String, required: true },
  marca: { type: String, required: true },
  sabor: { type: String },
  ingredientes: [{ type: String }],
  imagenes: [{ type: String }],
  stock: { type: Number, required: true, default: 0 },
  activo: { type: Boolean, default: true },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export const Producto = model<IProducto>('Producto', productoSchema);
