import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrameComponent } from './components/frame/frame.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FrameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'trinagle-counting';
}
