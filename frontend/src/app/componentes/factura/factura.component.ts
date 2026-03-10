import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Factura, Producto } from '../../modelos/factura';
import { FacturaService } from '../../servicios/factura';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent {
  factura: Factura = {
    numero: '',
    fecha: new Date(),
    cliente: {
      nombres: '',
      apellidos: '',
      cedula: '',
      celular: '',
      correo: ''
    },
    productos: [],
    subtotal: 0,
    impuestos: 0,
    descuentos: 0,
    total: 0,
    formaPago: 'efectivo',
    cajero: ''
  };

  constructor(private facturaService: FacturaService) {}

  agregarProducto() {
    this.factura.productos.push({
      codigo: '',
      descripcion: '',
      cantidad: 0,
      precioUnitario: 0,
      subtotal: 0
    });
  }

  calcularTotales() {
   let subtotal = 0;
  this.factura.productos.forEach((p: Producto) => {
    const cantidad = Number(p.cantidad) || 0;
    const precio = Number(p.precioUnitario) || 0;
    p.subtotal = cantidad * precio;
    subtotal += p.subtotal;
  });

  this.factura.subtotal = subtotal;
  this.factura.impuestos = subtotal * 0.19;

  const descuento = Number(this.factura.descuentos) || 0;
  this.factura.total = subtotal + this.factura.impuestos - descuento;
}


  guardarFactura() {
    const facturaParaEnviar = {
    numero: this.factura.numero,
    cliente: this.factura.cliente,
    productos: this.factura.productos.map(p => ({
      codigo: p.codigo,
      descripcion: p.descripcion,
      cantidad: p.cantidad,
      precioUnitario: p.precioUnitario
    })),
    descuentos: this.factura.descuentos,
    formaPago: this.factura.formaPago,
    cajero: this.factura.cajero
    
  };

  console.log('Factura enviada:', facturaParaEnviar);


    this.facturaService.guardarFactura(facturaParaEnviar).subscribe({
      next: (resp) => {
        console.log('Factura guardada en BD:', resp);
        alert('Factura guardada correctamente');
      },
      error: (err: any) => {
        console.error('Error al guardar factura', err);
        alert('Error al guardar la factura');
      }
    });
  }
}