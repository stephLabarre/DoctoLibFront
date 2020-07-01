import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthentificationComponent } from './composants/authentification/authentification.component';
import { HttpClientModule } from '@angular/common/http';
import { CreationcompteComponent } from './composants/creationcompte/creationcompte.component';
import { GestionhorairesComponent } from './composants/administrateur/gestionhoraires/gestionhoraires.component';
import { HammerModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { IgxTimePickerModule } from 'igniteui-angular';
import { GererutilisateursComponent } from './composants/administrateur/gererutilisateurs/gererutilisateurs.component';
import { ReservationComponent } from './composants/reservation/reservation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { LogoutComponent } from './composants/authentification/logout/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    CreationcompteComponent,
    GestionhorairesComponent,
    GererutilisateursComponent,
    ReservationComponent,
    LogoutComponent
  ],
  exports: [ReservationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    HammerModule,
    IgxTimePickerModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
