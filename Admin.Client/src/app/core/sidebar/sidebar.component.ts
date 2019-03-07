import {
  Component,
  OnInit,
  AfterViewChecked,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input,
  HostListener
} from '@angular/core';
import {
  group,
  animate,
  query,
  style,
  trigger,
  transition,
  state
} from '@angular/animations';
import pageMenus from '../../config/page-menus';
import pageSettings from '../../config/page-settings';
import { AuthService } from '../_services/auth.service';
import { User } from '../../pages/user/user.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  animations: [
    trigger('expandCollapse', [
      state(
        'expand',
        style({ height: '*', overflow: 'hidden', display: 'block' })
      ),
      state(
        'collapse',
        style({ height: '0px', overflow: 'hidden', display: 'block' })
      ),
      state(
        'active',
        style({ height: '*', overflow: 'hidden', display: 'block' })
      ),
      transition('expand <=> collapse', animate(100)),
      transition('active => collapse', animate(100))
    ])
  ]
})
export class SidebarComponent implements OnInit , AfterViewChecked {
  navProfileState = 'collapse';
  @ViewChild('sidebarScrollbar') private sidebarScrollbar: ElementRef;
  @Output() toggleSidebarMinified = new EventEmitter<boolean>();
  @Output() hideMobileSidebar = new EventEmitter<boolean>();
  @Input() pageSidebarMinified;

  user: User;
  menus = pageMenus;
  pageSettings = pageSettings;

  mobileMode;
  desktopMode;
  scrollTop;

  constructor(private eRef: ElementRef, public authService: AuthService) {
    if (window.innerWidth <= 767) {
      this.mobileMode = true;
      this.desktopMode = false;
    } else {
      this.mobileMode = false;
      this.desktopMode = true;
    }
  }

  ngOnInit() {
    this.user = this.authService.user;
    // this.sidebarService.cargarMenu();

  }

  ngAfterViewChecked() {
    if (typeof Storage !== 'undefined' && localStorage.sidebarScroll) {
      if (this.sidebarScrollbar && this.sidebarScrollbar.nativeElement) {
        this.sidebarScrollbar.nativeElement.scrollTop =
          localStorage.sidebarScroll;
      }
    }
  }

  toggleNavProfile() {
    if (this.navProfileState === 'collapse') {
      this.navProfileState = 'expand';
    } else {
      this.navProfileState = 'collapse';
    }
  }

  toggleMinified() {
    this.toggleSidebarMinified.emit(true);
    this.scrollTop = 40;
  }

  expandCollapseSubmenu(currentMenu, allMenu, active) {
    for (const menu of allMenu) {
      if (menu !== currentMenu) {
        menu.state = 'collapse';
      }
    }
    if (
      currentMenu.state === 'expand' ||
      (active.isActive && !currentMenu.state)
    ) {
      currentMenu.state = 'collapse';
    } else {
      currentMenu.state = 'expand';
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.hideMobileSidebar.emit(true);
    }
  }

  @HostListener('scroll', ['$event'])
  onScroll(event) {
    this.scrollTop = this.pageSettings.pageSidebarMinified
      ? event.srcElement.scrollTop + 40
      : 0;
    if (typeof Storage !== 'undefined') {
      localStorage.setItem('sidebarScroll', event.srcElement.scrollTop);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 767) {
      this.mobileMode = true;
      this.desktopMode = false;
    } else {
      this.mobileMode = false;
      this.desktopMode = true;
    }
  }
}
