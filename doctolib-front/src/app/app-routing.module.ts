import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthentificationComponent } from './composants/authentification/authentification.component';
import { CreationcompteComponent } from './composants/creationcompte/creationcompte.component';

const routes: Routes = [
  {path: 'authentification', component: AuthentificationComponent},
  {path: 'creationcompte', component: CreationcompteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
