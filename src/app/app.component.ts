import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'tm-root',
  standalone: true,
  imports: [RouterOutlet, ProjectComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
