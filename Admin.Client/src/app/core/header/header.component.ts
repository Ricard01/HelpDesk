import { Component, OnDestroy, Output, EventEmitter, OnInit } from '@angular/core';
import pageSettings from '../../config/page-settings';
import { AuthService } from '../_services/auth.service';
import { User } from '../../pages/user/user.model';
import { NotificacionServicie } from '../_services/notificacion.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  totalNotificaciones: number;
  notificaciones: any[];

  constructor(public authService: AuthService, public notificacionesService: NotificacionServicie,
    private route: Router) { }

  ngOnInit(): void {

    this.user = this.authService.user;
    this.getNotificaciones();

  }

  getNotificaciones() {

    this.notificacionesService.getNotificaciones().subscribe(res => {
      this.notificaciones = res;
      this.totalNotificaciones = this.notificaciones.length;
      console.log(res);
    });

  }


  mostrarTicket(ticketId: number) {

    this.notificacionesService.hideNotificacion(ticketId).subscribe(() => {
      this.getNotificaciones();
    }, error => {
      console.log(error);
    });

    this.route.navigate(['ticket/asignados/', ticketId]);

  }

  mobileSidebarToggle() {
    this.toggleMobileSidebar.emit(true);
  }

  ngOnDestroy() {
    this.pageSettings.pageMobileTopMenuToggled = false;
    this.pageSettings.pageMobileMegaMenuToggled = false;
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

}
