import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthentificationComponent } from './composants/authentification/authentification.component';
import { CreationcompteComponent } from './composants/creationcompte/creationcompte.component';
import { GestionhorairesComponent } from './composants/administrateur/gestionhoraires/gestionhoraires.component';
import { GererutilisateursComponent } from './composants/administrateur/gererutilisateurs/gererutilisateurs.component';
import { ReservationComponent } from './composants/reservation/reservation.component';
import { AuthGuardGuard } from './services/guards/auth-guard.guard';
import { LogoutComponent } from './composants/authentification/logout/logout/logout.component';

const routes: Routes = [
  {path: 'authentification', component: AuthentificationComponent},
  {path: 'creationcompte', component: CreationcompteComponent},
  {path: 'gestionhoraires', component: GestionhorairesComponent, canActivate: [AuthGuardGuard]},
  {path: 'gestionutilisateurs', component: GererutilisateursComponent, canActivate: [AuthGuardGuard]},
  {path: 'reservation', component: ReservationComponent},
  {path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
