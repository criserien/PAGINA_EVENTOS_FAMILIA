import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('proyecto-familia');
}
