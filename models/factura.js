const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductoSchema = new Schema({
  codigo: { type: String, required: true },
  descripcion: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precioUnitario: { type: Number, required: true },
  subtotal: { type: Number, required: true }
});

const FacturaSchema = new Schema({
  numero: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  cliente: {
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    cedula: { type: String, required: true },
    celular: { type: String },
    correo: { type: String }
  },
  productos: [ProductoSchema],
  subtotal: { type: Number, required: true },
  impuestos: { type: Number, required: true },
  descuentos: { type: Number, default: 0 },
  total: { type: Number, required: true },
  formaPago: { type: String, enum: ['efectivo', 'tarjeta', 'transferencia'], required: true },
  cajero: { type: String }
});

module.exports = mongoose.model('Factura', FacturaSchema);