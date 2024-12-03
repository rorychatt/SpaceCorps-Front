import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { GithubTimelineComponent } from '../components/github-timeline/github-timeline.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    GithubTimelineComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
