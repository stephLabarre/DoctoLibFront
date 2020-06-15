import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthentificationComponent } from './composants/authentification/authentification.component';
import { HttpClientModule } from '@angular/common/http';
import { CreationcompteComponent } from './composants/creationcompte/creationcompte.component'; 

@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    CreationcompteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }