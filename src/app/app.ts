import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationSidebarMenu } from './components/navigation-sidebar-menu/navigation-sidebar-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationSidebarMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('reddit-web');
}
