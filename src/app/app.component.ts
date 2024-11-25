import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectComponent } from './project/project.component';

@Component({
  selector: 'tm-root',
  standalone: true,
  imports: [RouterOutlet, ProjectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Pluralsight';
}
