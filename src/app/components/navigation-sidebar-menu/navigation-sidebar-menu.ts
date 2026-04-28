import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MenuItem } from '@reddit-web/types/menu-item.interface';

@Component({
  selector: 'app-navigation-sidebar-menu',
  imports: [],
  templateUrl: './navigation-sidebar-menu.html',
  styleUrl: './navigation-sidebar-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationSidebarMenu {
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'las la-tachometer-alt', active: true },
    { label: 'Products', icon: 'las la-box' },
    { label: 'Favourites', icon: 'las la-heart' },
    { label: 'Messenger', icon: 'las la-envelope' },
    { label: 'Order Lists', icon: 'las la-list' },
    { label: 'E-commerce', icon: 'las la-shopping-cart' },
    { label: 'File Manager', icon: 'las la-folder' },
    { label: 'Calendar', icon: 'las la-calendar' },
    { label: 'Feed', icon: 'las la-rss' },
    { label: 'To-Do', icon: 'las la-check-square' },
    { label: 'Contact', icon: 'las la-address-book' },
    { label: 'Invoice', icon: 'las la-file-invoice' },
    { label: 'UI Elements', icon: 'las la-palette' },
    { label: 'Profile', icon: 'las la-user' },
    { label: 'Table', icon: 'las la-table' },
    { label: 'Settings', icon: 'las la-cog' },
    { label: 'Logout', icon: 'las la-sign-out-alt' },
  ];
}
