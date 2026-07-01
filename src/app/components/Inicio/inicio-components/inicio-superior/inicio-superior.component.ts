import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'inicio-superior',
  templateUrl: './inicio-superior.component.html',
  styleUrls: ['./inicio-superior.component.css'],
  imports: [RouterLink]
})
export class InicioSuperiorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
