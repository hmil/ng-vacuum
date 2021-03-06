import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FancyButtonComponent } from './fancy-button.component';
import { CONSOLE } from './auth/app.providers';

@NgModule({
  declarations: [
    AppComponent,
    FancyButtonComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [{
    provide: CONSOLE, useValue: console
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
