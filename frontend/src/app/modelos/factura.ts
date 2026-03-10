export interface Producto {
  codigo: string;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Cliente {
  nombres: string;
  apellidos: string;
  cedula: string;
  celular?: string;
  correo?: string;
}

export interface Factura {
  numero: string;
  fecha: Date;
  cliente: Cliente;
  productos: Producto[];
  subtotal: number;
  impuestos: number;
  descuentos?: number;
  total: number;
  formaPago: 'efectivo' | 'tarjeta' | 'transferencia';
  cajero?: string;
}