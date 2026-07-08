import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import { LoginService } from '../../../servicios/login.service';
import { CommonModule } from "@angular/common";

export interface Evento {
  id: number;
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
  selector: 'app-mis-eventos',
  templateUrl: './mis-eventos.component.html',
  styleUrls: ['./mis-eventos.component.css'],
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule]
})
export class MisEventosComponent implements OnInit {
  
  correoUsuario: string = ''; 
  public listaEventos: Evento[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: LoginService
  ) { }

  ngOnInit() {
    const usuario = this.authService.usuarioLogueado;
    if (usuario && usuario.correo) {
      this.correoUsuario = usuario.correo;
      this.cargarEventos();
    } else {
      console.warn('No se encontró ningún usuario logueado o el correo está vacío.');
    }
  }
  
  private cargarEventos(): void {
    const urlFiltrada = `https://back-eventos-familia-net.onrender.com/api/eventos/${this.correoUsuario}`;
    this.http.get<Evento[]>(urlFiltrada).subscribe({
      next: (data) => {
        this.listaEventos = data;
        console.log('Eventos cargados con éxito:', this.listaEventos);
      },
      error: (err) => {
        console.error('Error al obtener los eventos del servidor:', err);
      }
    });
  }

  // 👈 NUEVA FUNCIÓN PARA ELIMINAR EL REGISTRO
  eliminarEvento(event: Event, evento: Evento): void {
    // 💥 EVITA que el clic active el routerLink de la tarjeta padre
    event.stopPropagation();

    const confirmar = confirm(`¿Estás seguro de que deseas eliminar el evento "${evento.titulo}"?`);
    if (!confirmar) return;

    const urlDelete = `https://back-eventos-familia-net.onrender.com/api/eventos/${evento.id}`;

    this.http.delete(urlDelete).subscribe({
      next: (res) => {
        console.log('Borrado exitoso:', res);
        
        // 🔄 Actualizamos la lista local en tiempo real quitando el evento borrado
        this.listaEventos = this.listaEventos.filter(ev => ev.id !== evento.id);
        alert('Evento eliminado correctamente.');
      },
      error: (err) => {
        console.error('Error al intentar eliminar el evento:', err);
        alert('No se pudo eliminar el evento en la base de datos.');
      }
    });
  }
  
  trackByFn(index: number, item: Evento): number {
    return item.id;
  }
}