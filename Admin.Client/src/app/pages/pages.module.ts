import { NgModule } from '@angular/core';

// CoreModule
import { CoreModule } from '../core/core.module';


// NG
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CoreModule,
    BrowserAnimationsModule,
  ]
})
export class PagesModule { }
