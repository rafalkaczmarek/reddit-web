import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavigationSidebarMenu } from '@admin-panel-web/navigation/components/navigation-sidebar-menu/navigation-sidebar-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationSidebarMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
