import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FacturaComponent } from './componentes/factura/factura.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, FacturaComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],  
})
export class App {
  protected readonly title = signal('frontend');
}