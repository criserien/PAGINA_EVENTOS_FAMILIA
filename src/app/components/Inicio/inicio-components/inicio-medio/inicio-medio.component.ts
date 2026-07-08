import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";

// Definimos la estructura exacta de tu JSON
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
  selector: 'inicio-medio',
  templateUrl: './inicio-medio.component.html',
  styleUrls: ['./inicio-medio.component.css'],
  standalone: true, // Asegura el comportamiento standalone
  imports: [RouterLink, CommonModule, HttpClientModule] // Agregados CommonModule y HttpClientModule
})
export class InicioMedioComponent implements OnInit {

  // Arreglo dinámico donde se guardará el JSON de la API
  public listaEventos: Evento[] = [];
    
  // URL de tu API
  private apiUrl = 'https://back-eventos-familia-net.onrender.com/api/eventos'; 

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.cargarEventos();
  }

  // Método para consumir la API
    private cargarEventos(): void {
      this.http.get<Evento[]>(this.apiUrl).subscribe({
        next: (data) => {
          this.listaEventos = data;
        },
        error: (err) => {
          console.error('Error al obtener los eventos del servidor:', err);
        }
      });
    }
  
    // Función para optimizar el rendimiento del ngFor
    trackByFn(index: number, item: Evento): number {
      return item.id;
    }

}
