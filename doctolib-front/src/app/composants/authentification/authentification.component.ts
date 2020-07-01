import { Component, OnInit } from '@angular/core';
import { AuthentificationForm } from './AuthentificationForm';
import { Utilisateur } from '../../entites/Utilisateur';
import { UtilisateurService } from '../../services/utilisateur.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from 'src/app/services/login/login.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  authentificationForm = new AuthentificationForm("", "");
    
  user: Utilisateur;

  constructor(private utilisateurService: UtilisateurService, private loginService: LoginService, private appComponent: AppComponent) { }

  ngOnInit(): void {
  }

  login() {
    let utilisateur = new Utilisateur(0, "","", this.authentificationForm.login, this.authentificationForm.mdp,"", 0,"","","","", "");
    this.utilisateurService.loggedUser(utilisateur).subscribe(user => {
      this.user = user; 
      if (user != null) {
        console.log("Utilisateur connecté=" + this.user.nom + " prenom=" + this.user.prenom + " login=" + this.user.login + " role=" + this.user.role);  
        if (user.role === 'ADMIN') {
          this.loginService.isAdmin();
          this.appComponent.admin = true;
        } else {
          this.loginService.isNotAdmin();
          this.appComponent.admin = false;
        }
        this.appComponent.show = true;
      } else {
        this.loginService.isNotAdmin();
      }
    }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
            console.log('Client-side error occured.');
        } else {
            console.log('Server-side error occured.');
        }
    });  
  }
}
