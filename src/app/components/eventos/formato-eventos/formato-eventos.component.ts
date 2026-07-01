import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http'; // 👈 IMPORTANTE para la petición

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
  imagen_url?: string; // 👈 Añadido opcional por si la BD ya maneja la URL
}

@Component({
  selector: 'app-formato-eventos',
  templateUrl: './formato-eventos.component.html',
  styleUrls: ['./formato-eventos.component.css'],
  standalone: true,
  imports: [CommonModule] 
})
export class FormatoEventosComponent implements OnInit {
  
  public eventoSeleccionado: Evento | null = null;
  public selectedFile: File | null = null;
  public imagenActual: string | null = null; 
  public cargando: boolean = false;

  // 🔥 NUEVA VARIABLE: Guarda la lista de URLs que nos devuelva el servidor
  public imagenesCarpeta: string[] = [];

  constructor(private router: Router, private http: HttpClient) {
    const navegacionActual = this.router.getCurrentNavigation();
    if (navegacionActual && navegacionActual.extras.state) {
      this.eventoSeleccionado = navegacionActual.extras.state['infoEvento'] as Evento;
      if (this.eventoSeleccionado?.imagen_url) {
        this.imagenActual = this.eventoSeleccionado.imagen_url;
      }
    }
  }

  ngOnInit(): void {
    if (this.eventoSeleccionado) {
      console.log('Datos del evento recibidos por State:', this.eventoSeleccionado);
      // 🔥 Al cargar la página, traemos todas las fotos de la carpeta de este evento
      this.obtenerImagenes();
    }
  }

  // 🔥 NUEVA FUNCIÓN: Llama al nuevo endpoint GET del servidor
  obtenerImagenes(): void {
    if (!this.eventoSeleccionado) return;

    const nombreCarpeta = this.eventoSeleccionado.titulo.replace(/ /g, "-");
    const backendUrl = `http://localhost:3000/api/imagenes/${nombreCarpeta}`;

    this.http.get<string[]>(backendUrl).subscribe({
      next: (urls) => {
        this.imagenesCarpeta = urls;
        console.log("Imágenes de la carpeta cargadas:", this.imagenesCarpeta);
      },
      error: (err) => {
        console.error("Error al obtener la galería de imágenes:", err);
      }
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onUpload(): void {
    if (!this.selectedFile || !this.eventoSeleccionado) return;

    this.cargando = true;
    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);

    const nombreCarpeta = this.eventoSeleccionado.titulo.replace(/ /g, "-");
    const backendUrl = `http://localhost:3000/api/upload/${nombreCarpeta}`;

    this.http.post(backendUrl, formData).subscribe({
      next: (response: any) => {
        this.cargando = false;
        this.selectedFile = null;
        
        // 🔥 TRUCO: Volvemos a llamar a la función para que refresque la lista de fotos al instante
        this.obtenerImagenes(); 
        
        alert('¡Imagen añadida a la galería con éxito!');
      },
      error: (error) => {
        console.error('Error al subir la imagen:', error);
        this.cargando = false;
        alert('Hubo un error al procesar la imagen.');
      }
    });
  }
}