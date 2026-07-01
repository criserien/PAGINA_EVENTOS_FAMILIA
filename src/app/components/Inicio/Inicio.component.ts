import { Component, OnInit } from '@angular/core';
import { InicioSuperiorComponent } from "./inicio-components/inicio-superior/inicio-superior.component";
import { InicioMedioComponent } from "./inicio-components/inicio-medio/inicio-medio.component";
import { InicioInferiorComponent } from "./inicio-components/inicio-inferior/inicio-inferior.component";

@Component({
  selector: 'app-Inicio',
  templateUrl: './Inicio.component.html',
  styleUrls: ['./Inicio.component.css'],
  imports: [InicioSuperiorComponent, InicioMedioComponent]
})
export class InicioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}