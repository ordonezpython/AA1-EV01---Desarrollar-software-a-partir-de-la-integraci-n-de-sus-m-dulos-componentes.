import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../modelos/factura';

@Injectable({ providedIn: 'root' })
export class FacturaService {
  private apiUrl = 'http://localhost:3000/api/facturas';

  constructor(private http: HttpClient) {}

  guardarFactura(factura: any): Observable<any> {
    return this.http.post(this.apiUrl, factura);
  }
}