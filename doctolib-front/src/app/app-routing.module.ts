import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthentificationComponent } from './composants/authentification/authentification.component';
import { CreationcompteComponent } from './composants/creationcompte/creationcompte.component';
import { GestionhorairesComponent } from './composants/administrateur/gestionhoraires/gestionhoraires.component';
import { GererutilisateursComponent } from './composants/administrateur/gererutilisateurs/gererutilisateurs.component';
import { ReservationComponent } from './composants/reservation/reservation.component';

const routes: Routes = [
  {path: 'authentification', component: AuthentificationComponent},
  {path: 'creationcompte', component: CreationcompteComponent},
  {path: 'gestionhoraires', component: GestionhorairesComponent},
  {path: 'gestionutilisateurs', component: GererutilisateursComponent},
  {path: 'reservation', component: ReservationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
