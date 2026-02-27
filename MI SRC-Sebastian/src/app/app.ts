import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
       // 🔥 ESTO HABILITA LOS LINKS
  ],
  styleUrls: ['./app.css'],
  templateUrl: './app.html'
})
export class App {
  title = () => 'Heladería 2025';
}
