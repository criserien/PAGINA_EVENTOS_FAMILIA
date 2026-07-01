import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Para usar @if o *ngIf si es necesario
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'], // Puedes usar el mismo CSS centrado que armamos
  imports: [RouterLink, FormsModule, CommonModule]
})
export class RegistroComponent {
  // Variables ligadas al HTML
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  
  // Alertas para el usuario
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  onRegister(): void {
    this.errorMessage = null;
    this.successMessage = null;

    // 1. Validación local: Que las contraseñas coincidan
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    // 2. Creamos el objeto exactamente como lo pide el backend (req.body)
    const newUser = {
      username: this.username,
      correo: this.email,
      contrasena: this.password
    };

    // 3. Enviamos los datos al servidor
    this.loginService.registrar(newUser).subscribe({
      next: (response) => {
        this.successMessage = '¡Cuenta creada con éxito! Redirigiendo...';
        console.log('Usuario registrado:', response);
        
        // Esperamos 2 segundos para que el usuario vea el éxito y redirigimos al login
        setTimeout(() => {
          this.router.navigate(['/inicio-sesion']);
        }, 2000);
      },
      error: (err) => {
        // Captura los errores del backend (Ej: 400 si ya existe el correo/user)
        if (err.error && err.error.error) {
          this.errorMessage = err.error.error; // Muestra el mensaje exacto enviado por tu Express
        } else {
          this.errorMessage = 'Hubo un error en el servidor. Inténtalo más tarde.';
        }
      }
    });
  }
}
