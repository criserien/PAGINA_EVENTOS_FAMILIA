import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-usuario',
  standalone: true, // Asegúrate de tenerlo si usas imports
  templateUrl: './panel-usuario.component.html',
  styleUrls: ['./panel-usuario.component.css'],
  imports: [RouterOutlet, RouterLink, RouterLinkActive] // Añadimos RouterLink y Active para el menú
})
export class PanelUsuarioComponent implements OnInit {
  // Aquí guardamos lo que interceptamos del login
  emailRecibido: string = '';
  passwordRecibido: string = '';

  constructor(private router: Router) {
    // El padre atrapa el state del login
    const state = this.router.getCurrentNavigation()?.extras.state;
    
    if (state) {
      this.emailRecibido = state['usuario'];
      this.passwordRecibido = state['contrasena'];
      console.log('Padre interceptó los datos con éxito:', this.emailRecibido);
    }
  }

  ngOnInit() {}
}
