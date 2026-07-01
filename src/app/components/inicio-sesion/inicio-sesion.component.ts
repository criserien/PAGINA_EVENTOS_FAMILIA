import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
  imports: [RouterLink, FormsModule]
})
export class InicioSesionComponent {
  email = '';
  password = '';
  errorMessage: string | null = null;

  constructor(
    private authService: LoginService, 
    private router: Router
  ) { }

  onLogin(): void {
    this.errorMessage = null; 

    // 3. Le pasamos el correo que escribió el usuario al método login
    this.authService.login(this.email).subscribe({
      next: (usuarioBD) => {
        
        // Validación interna
        if (usuarioBD.correo === this.email && usuarioBD.contrasena === this.password) {
          
          console.log('¡Credenciales correctas! Bienvenido:', usuarioBD.username);
          
          // Guardamos el usuario globalmente en el servicio
          this.authService.usuarioLogueado = usuarioBD; 

          // Redirección enviando los datos en el state para el PanelUsuario
          this.router.navigate(['/panel-usuario/datos'], { 
            state: { 
              usuario: usuarioBD.correo,      
              contrasena: usuarioBD.contrasena 
            } 
          });
          
        } else {
          this.errorMessage = 'El correo o la contraseña son incorrectos.';
        }
      },
      error: (err) => {
        if (err.status === 404) {
          this.errorMessage = 'El usuario no existe en la base de datos.';
        } else {
          this.errorMessage = 'Error de conexión con el servidor.';
        }
      }
    });
  }
}