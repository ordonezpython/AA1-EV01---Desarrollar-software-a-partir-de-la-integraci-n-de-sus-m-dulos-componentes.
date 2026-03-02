const mongoose = require('mongoose');
const { Schema } = mongoose;

const FacturaSchema = new Schema({
  numero: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  monto: { type: Number, required: true },
  cliente: {
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    cedula: { type: String, required: true },
    celular: { type: String, required: true },
    correo: { type: String, required: true }
  }
});

module.exports = mongoose.model('Factura', FacturaSchema);