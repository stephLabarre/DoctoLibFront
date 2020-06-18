import { Component, OnInit } from '@angular/core';
import { AuthentificationForm } from './AuthentificationForm';
import { Utilisateur } from '../../entites/Utilisateur';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  authentificationForm = new AuthentificationForm("", "");
    
  user: Utilisateur;

  constructor() { }

  ngOnInit(): void {
  }

  login() {
    this.user = new Utilisateur(0, "","",this.authentificationForm.login, this.authentificationForm.mdp,"",null,"","","","","");
//    let userLoged: Utilisateur = this.utilisateurService.login(user);
//    this.isLogged = userLoged != null ? true : false;
// http://localhost:8080/utilisateur
    console.log("Utilisateur connecté : " + this.user.toJson(this.user));
  }
}
