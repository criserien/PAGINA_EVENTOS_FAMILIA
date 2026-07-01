import { Routes } from '@angular/router';
import { InicioComponent } from './components/Inicio/Inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';
import { EventosComponent } from './components/eventos/eventos/eventos.component';
import { PanelUsuarioComponent } from './components/usuario/panel-usuario/panel-usuario.component';
import { UsuarioDatosComponent } from './components/usuario/usuario-datos/usuario-datos.component';
import { UsuarioEventosComponent } from './components/usuario/usuario-eventos/usuario-eventos.component';
import { FormatoEventosComponent } from './components/eventos/formato-eventos/formato-eventos.component';
import { CrearEventoComponent } from './components/usuario/crear-evento/crear-evento.component';
import { MisEventosComponent } from './components/usuario/mis-eventos/mis-eventos.component';
import { MisEventosFormatoComponent } from './components/usuario/mis-eventos/mis-eventos-formato/mis-eventos-formato.component';

export const routes: Routes = [
    {
        path : '',
        component : InicioComponent
    },
    {
        path : 'registro',
        component : RegistroComponent
    },
    {
        path : 'inicio-sesion',
        component : InicioSesionComponent
    },
    {
        path : 'recuperar-contrasena',
        component : RecuperarContrasenaComponent
    },
    {
        path : 'eventos',
        component : EventosComponent
    },
    {
        path : 'panel-usuario',
        component : PanelUsuarioComponent,
        children: [
            // Cuando entren a /panel-usuario, por defecto se inyectan los datos
            { path: '', redirectTo: 'datos', pathMatch: 'full' }, 
            { path: 'datos', component: UsuarioDatosComponent }, // Componente para mostrar los datos del usuario
            // Cuando den clic en eventos, se inyectan los eventos en la misma sección
            { path: 'eventos', component: UsuarioEventosComponent }, // Componente para mostrar los eventos del usuario
            { path: 'crear-evento', component: CrearEventoComponent },
            { path: 'mis-eventos', component: MisEventosComponent },
            { path: 'mis-eventos-formato', component: MisEventosFormatoComponent }
        ]
    },
    {
        path : 'formato-eventos',
        component : FormatoEventosComponent
    },
];
