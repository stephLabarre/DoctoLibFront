import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthentificationComponent } from './composants/authentification/authentification.component';
import { CreationcompteComponent } from './composants/creationcompte/creationcompte.component';
import { GestionhorairesComponent } from './composants/administrateur/gestionhoraires/gestionhoraires.component';

const routes: Routes = [
  {path: 'authentification', component: AuthentificationComponent},
  {path: 'creationcompte', component: CreationcompteComponent},
  {path: 'gestionhoraires', component: GestionhorairesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
