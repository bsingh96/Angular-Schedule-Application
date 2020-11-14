import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule, } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http'

import {BackendServiceService} from './backend-service.service';

@NgModule({
  declarations: [
    AppComponent,
   routingComponents,
  ],
  imports: [ RouterModule, 
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule, 
    MatButtonModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [BackendServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
