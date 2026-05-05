import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Tree, TreeItem } from '@angular/aria/tree';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { NavigationMenuItem } from '@admin-panel-web/navigation/types/navigation-menu-item.interface';

@Component({
  selector: 'app-navigation-sidebar-menu',
  imports: [Tree, TreeItem, RouterLink, RouterLinkActive],
  templateUrl: './navigation-sidebar-menu.html',
  styleUrl: './navigation-sidebar-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationSidebarMenu {
  protected mainMenuItems: NavigationMenuItem[] = [
    { label: 'Dashboard', icon: 'las la-tachometer-alt', route: '/dashboard' },
    { label: 'Products', icon: 'las la-box', route: '/products' },
    { label: 'Favourites', icon: 'las la-heart', route: '/favourites' },
    { label: 'Messenger', icon: 'las la-envelope', route: '/messenger' },
    { label: 'Order Lists', icon: 'las la-list', route: '/order-lists' },
    { label: 'E-commerce', icon: 'las la-shopping-cart', route: '/e-commerce' },
  ];

  protected secondaryMenuItems: NavigationMenuItem[] = [
    { label: 'File Manager', icon: 'las la-folder', route: '/file-manager' },
    { label: 'Calendar', icon: 'las la-calendar', route: '/calendar' },
    { label: 'Feed', icon: 'las la-rss', route: '/feed' },
    { label: 'To-Do', icon: 'las la-check-square', route: '/to-do' },
    { label: 'Contact', icon: 'las la-address-book', route: '/contact' },
    { label: 'Invoice', icon: 'las la-file-invoice', route: '/invoice' },
    { label: 'UI Elements', icon: 'las la-palette', route: '/ui-elements' },
    { label: 'Profile', icon: 'las la-user', route: '/profile' },
    { label: 'Table', icon: 'las la-table', route: '/table' },
    { label: 'Settings', icon: 'las la-cog', route: '/settings' },
    { label: 'Logout', icon: 'las la-sign-out-alt', route: '/logout' },
  ];
}
