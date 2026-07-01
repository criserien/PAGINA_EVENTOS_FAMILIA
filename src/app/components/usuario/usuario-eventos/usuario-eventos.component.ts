import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-usuario-eventos',
  templateUrl: './usuario-eventos.component.html',
  styleUrls: ['./usuario-eventos.component.css'],
  imports: [RouterLink]
})
export class UsuarioEventosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
