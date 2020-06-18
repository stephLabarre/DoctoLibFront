import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthentificationComponent } from './composants/authentification/authentification.component';
import { HttpClientModule } from '@angular/common/http';
import { CreationcompteComponent } from './composants/creationcompte/creationcompte.component';
import { GestionhorairesComponent } from './composants/administrateur/gestionhoraires/gestionhoraires.component';
import { HammerModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxTimePickerModule } from 'igniteui-angular';
import { GererutilisateursComponent } from './composants/administrateur/gererutilisateurs/gererutilisateurs.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    CreationcompteComponent,
    GestionhorairesComponent,
    GererutilisateursComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    HammerModule,
    IgxTimePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
