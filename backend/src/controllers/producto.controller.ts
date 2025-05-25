import { Request, Response } from 'express';
import { Producto, IProducto } from '../models/producto';

export const productoController = {
  // Obtener todos los productos con filtros opcionales
  getProductos: async (req: Request, res: Response) => {
    try {
      const { categoria, tipo, marca, sabor, precioMin, precioMax } = req.query;
      const query: any = {};

      if (categoria) query.categoria = categoria;
      if (tipo) query.tipo = tipo;
      if (marca) query.marca = marca;
      if (sabor) query.sabor = sabor;
      if (precioMin) query.precio = { $gte: parseFloat(precioMin as string) };
      if (precioMax) {
        query.precio = { ...query.precio, $lte: parseFloat(precioMax as string) };
      }

      const productos = await Producto.find(query);
      res.json(productos);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({ mensaje: 'Error al obtener productos' });
    }
  },

  // Obtener un producto por ID
  getProductoPorId: async (req: Request, res: Response) => {
    try {
      const producto = await Producto.findById(req.params.id);
      if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }
      res.json(producto);
    } catch (error) {
      console.error('Error al obtener producto:', error);
      res.status(500).json({ mensaje: 'Error al obtener producto' });
    }
  },

  // Obtener productos relacionados por categoría
  getProductosRelacionados: async (req: Request, res: Response) => {
    try {
      const query: any = { categoria: req.params.categoria };
      if (req.params.id) {
        query._id = { $ne: req.params.id };
      }
      const productos = await Producto.find(query).limit(4);
      res.json(productos);
    } catch (error) {
      console.error('Error al obtener productos relacionados:', error);
      res.status(500).json({ mensaje: 'Error al obtener productos relacionados' });
    }
  },

  // Crear un nuevo producto
  crearProducto: async (req: Request, res: Response) => {
    try {
      const nuevoProducto = new Producto(req.body);
      await nuevoProducto.save();
      res.status(201).json(nuevoProducto);
    } catch (error) {
      console.error('Error al crear producto:', error);
      res.status(500).json({ mensaje: 'Error al crear producto' });
    }
  },

  // Actualizar un producto
  actualizarProducto: async (req: Request, res: Response) => {
    try {
      const producto = await Producto.findByIdAndUpdate(
        req.params.id,
        { ...req.body, fechaActualizacion: new Date() },
        { new: true }
      );
      if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }
      res.json(producto);
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.status(500).json({ mensaje: 'Error al actualizar producto' });
    }
  },

  // Eliminar un producto
  eliminarProducto: async (req: Request, res: Response) => {
    try {
      const producto = await Producto.findByIdAndDelete(req.params.id);
      if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }
      res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      res.status(500).json({ mensaje: 'Error al eliminar producto' });
    }
  }
};
