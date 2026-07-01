import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../servicios/login.service'; // Ajusta la ruta de tu servicio

@Component({
  selector: 'app-usuario-datos',
  templateUrl: './usuario-datos.component.html',
  styleUrls: ['./usuario-datos.component.css']
})
export class UsuarioDatosComponent implements OnInit {
  emailRecibido: string = '';
  passwordRecibido: string = '';

  constructor(private authService: LoginService) { }

  ngOnInit() {
    // Al cargar el componente, le preguntamos al servicio si hay alguien logueado
    const usuario = this.authService.usuarioLogueado;
    if (usuario) {
      this.emailRecibido = usuario.correo;
      this.passwordRecibido = usuario.contrasena;
    }
  }
}