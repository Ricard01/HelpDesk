import { Component, OnDestroy, Output, EventEmitter, OnInit } from '@angular/core';
import pageSettings from '../../config/page-settings';
import { AuthService } from '../_services/auth.service';
import { User } from '../../pages/user/user.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  // @Input() pageSidebarTwo;
  // @Output() toggleSidebarRightCollapsed = new EventEmitter<boolean>();
  @Output() toggleMobileSidebar = new EventEmitter<boolean>();
  // @Output() toggleMobileRightSidebar = new EventEmitter<boolean>();
  pageSettings = pageSettings;
  user: User;
  mobileSidebarToggle() {
    this.toggleMobileSidebar.emit(true);
  }
  // mobileRightSidebarToggle() {
  //   this.toggleMobileRightSidebar.emit(true);
  // }
  // toggleSidebarRight() {
  //   this.toggleSidebarRightCollapsed.emit(true);
  // }

  // mobileTopMenuToggle() {
  //   this.pageSettings.pageMobileTopMenuToggled = !this.pageSettings
  //     .pageMobileTopMenuToggled;
  // }

  // mobileMegaMenuToggle() {
  //   this.pageSettings.pageMobileMegaMenuToggled = !this.pageSettings
  //     .pageMobileMegaMenuToggled;
  // }
  ngOnInit(): void {
    this.user = this.authService.user;
  }

  ngOnDestroy() {
    this.pageSettings.pageMobileTopMenuToggled = false;
    this.pageSettings.pageMobileMegaMenuToggled = false;
  }

  constructor(public authService: AuthService) { }


}
