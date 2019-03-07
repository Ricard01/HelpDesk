import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';
import pageSettings from '../config/page-settings';
import { Title } from '@angular/platform-browser';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(
    private titleService: Title,
    private router: Router,
    private ngxSpiner: NgxSpinnerService,
    private renderer: Renderer2
  ) {
    router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        if (window.innerWidth < 768) {
          this.pageSettings.pageMobileSidebarToggled = false;
        }
        if (e.url !== '/') {
          ngxSpiner.show();
        }
      }
      if (e instanceof NavigationEnd) {
        if (e.url !== '/') {
          setTimeout(function() {
            ngxSpiner.hide();
          }, 300);
        }
      }
    });
  }
  pageSettings;

  // window scroll
  pageHasScroll;

  ngOnInit() {
    // page settings
    this.pageSettings = pageSettings;

  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    const doc = document.documentElement;
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    if (top > 0) {
      this.pageHasScroll = true;
    } else {
      this.pageHasScroll = false;
    }
  }

// Minimiza a la izq sidebar
onToggleSidebarMinified(val: boolean): void {
  if (this.pageSettings.pageSidebarMinified) {
    this.pageSettings.pageSidebarMinified = false;
  } else {
    this.pageSettings.pageSidebarMinified = true;
  }
}
  // set page right collapse
  onToggleSidebarRight(val: boolean): void {
    if (this.pageSettings.pageSidebarRightCollapsed) {
      this.pageSettings.pageSidebarRightCollapsed = false;
    } else {
      this.pageSettings.pageSidebarRightCollapsed = true;
    }
  }

  // hide mobile sidebar
  onHideMobileSidebar(val: boolean): void {
    if (this.pageSettings.pageMobileSidebarToggled) {
      if (this.pageSettings.pageMobileSidebarFirstClicked) {
        this.pageSettings.pageMobileSidebarFirstClicked = false;
      } else {
        this.pageSettings.pageMobileSidebarToggled = false;
      }
    }
  }

  // toggle mobile sidebar
  onToggleMobileSidebar(val: boolean): void {
    if (this.pageSettings.pageMobileSidebarToggled) {
      this.pageSettings.pageMobileSidebarToggled = false;
    } else {
      this.pageSettings.pageMobileSidebarToggled = true;
      this.pageSettings.pageMobileSidebarFirstClicked = true;
    }
  }

}
