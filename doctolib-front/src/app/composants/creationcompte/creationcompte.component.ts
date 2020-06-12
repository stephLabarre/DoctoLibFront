import { Component, OnInit } from '@angular/core';
import { CreationCompteForm } from './CreationCompteForm';
import { Utilisateur } from '../../entites/Utilisateur';

@Component({
  selector: 'app-creationcompte',
  templateUrl: './creationcompte.component.html',
  styleUrls: ['./creationcompte.component.css']
})
export class CreationcompteComponent implements OnInit {

  creationCompteForm =  new CreationCompteForm("","","","","","","","","","");  
 
  user: Utilisateur;
  constructor() { }

  ngOnInit(): void {
  }

  creerCompte() {
    this.user = new Utilisateur(this.creationCompteForm.nom,this.creationCompteForm.prenom,
        this.creationCompteForm.login, this.creationCompteForm.mdp,this.creationCompteForm.adresse,
        this.creationCompteForm.codePostal,this.creationCompteForm.ville,this.creationCompteForm.email,
        this.creationCompteForm.tel,this.creationCompteForm.numSecuSociale);
    //    let userLoged: Utilisateur = this.utilisateurService.login(user);
    //    this.isLogged = userLoged != null ? true : false;
        console.log("Utilisateur connecté : " + this.user.toJson(this.user));
  }
}