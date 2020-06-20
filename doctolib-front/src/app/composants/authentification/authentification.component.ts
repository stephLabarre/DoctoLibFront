import { Component, OnInit } from '@angular/core';
import { AuthentificationForm } from './AuthentificationForm';
import { Utilisateur } from '../../entites/Utilisateur';
import { UtilisateurService } from '../../services/utilisateur.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  authentificationForm = new AuthentificationForm("", "");
    
  user: Utilisateur;

  constructor(private utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
  }

  login() {
    let utilisateur = new Utilisateur(0, "","", this.authentificationForm.login, this.authentificationForm.mdp,"", 0,"","","","", "");
    this.utilisateurService.loggedUser(utilisateur).subscribe(user => {
      this.user = user; 
      if (user != null) {
        console.log("Utilisateur connecté=" + this.user.nom + " prenom=" + this.user.prenom + " login=" + this.user.login + " role=" + this.user.role);  
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
