import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface Evento {
  id: number | string;
  correo: string;
  titulo: string;
  lugar: string;
  fecha: string;
  hora: string;
  evento_1?: string;
  evento_2?: string;
  evento_3?: string;
  evento_4?: string;
  evento_5?: string;
  evento_6?: string;
  evento_7?: string;
}

@Component({
  selector: 'app-mis-eventos-formato',
  templateUrl: './mis-eventos-formato.component.html',
  styleUrls: ['./mis-eventos-formato.component.css'],
  standalone: true,
  imports: [CommonModule] // Ya no necesitas HttpClientModule aquí porque no hace peticiones externas
})

export class MisEventosFormatoComponent implements OnInit {

  public eventoSeleccionado: Evento | null = null;
  
  constructor(private router: Router) {
    // CORREGIDO: Se quitó el espacio entre 'navegacion' y 'Actual'
    const navegacionActual = this.router.getCurrentNavigation();
      
    if (navegacionActual && navegacionActual.extras.state) {
      this.eventoSeleccionado = navegacionActual.extras.state['infoEvento'] as Evento;
    }
  }

  ngOnInit(): void {
    // Si quieres verificar que los datos llegaron correctamente:
    if (this.eventoSeleccionado) {
      console.log('Datos del evento recibidos por State:', this.eventoSeleccionado);
    } else {
      console.warn('No se recibieron datos por State (posible F5 o recarga de página).');
    }
  }

}
