import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // 👈 Agregamos ReactiveFormsModule aquí
import { HttpClient, HttpClientModule } from '@angular/common/http'; // 👈 Agregamos HttpClientModule aquí
import { LoginService } from '../../../servicios/login.service';

@Component({
  selector: 'app-crear-evento',
  standalone: true, // 👈 1. VOLVEMOS EL COMPONENTE STANDALONE
  imports: [ReactiveFormsModule, HttpClientModule], // 👈 2. LE DAMOS LAS HERRAMIENTAS DIRECTAMENTE A ÉL
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent implements OnInit {
  
  eventoForm!: FormGroup;
  private apiUrl = 'https://proyecto-eventos-familia.onrender.com/api/eventos';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: LoginService
  ) { }

  ngOnInit() {
    let correoUsuario = '';
    const usuario = this.authService.usuarioLogueado;
    if (usuario) {
      correoUsuario = usuario.correo;
    }

    this.eventoForm = this.fb.group({
      correo: [correoUsuario, [Validators.required, Validators.email]],
      titulo: ['', Validators.required],
      lugar: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      evento_1: [''],
      evento_2: [''],
      evento_3: [''],
      evento_4: [''],
      evento_5: [''],
      evento_6: [''],
      evento_7: ['']
    });
  }

  enviarEvento() {
    console.log("1. Se hizo clic en Enviar");
    console.log("2. ¿El formulario es válido?", this.eventoForm.valid);
    console.log("3. Datos que se van a enviar:", this.eventoForm.value);

    if (this.eventoForm.valid) {
      const datosFormulario = this.eventoForm.value;

      this.http.post(this.apiUrl, datosFormulario).subscribe({
        next: (response) => {
          console.log('4. ¡Servidor respondió con éxito!', response);
          alert('Evento registrado correctamente.');
          
          const correoActual = this.eventoForm.get('correo')?.value;
          this.eventoForm.reset();
          this.eventoForm.patchValue({ correo: correoActual });
        },
        error: (error) => {
          console.error('4. Error crítico en la petición HTTP:', error);
          alert('Hubo un error al intentar registrar el evento.');
        }
      });
    } else {
      console.warn("Formulario inválido. Revisa qué campo obligatorio falta.");
      alert('Por favor, rellena todos los campos obligatorios.');
    }
  }
}