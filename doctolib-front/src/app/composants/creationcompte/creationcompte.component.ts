import { Component, OnInit } from '@angular/core';
import { CreationCompteForm } from './CreationCompteForm';
import { Utilisateur } from '../../entites/Utilisateur';
import {  UtilisateurService } from '../../services/utilisateur.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creationcompte',
  templateUrl: './creationcompte.component.html',
  styleUrls: ['./creationcompte.component.css']
})
export class CreationcompteComponent implements OnInit {

  creationCompteForm =  new CreationCompteForm("","","","","",null,"","","","", "");  
 
  user: Utilisateur;

  constructor(private utilisateurService: UtilisateurService, private routeur: Router) { }

  ngOnInit(): void {
    this.creationCompteForm.nom = "";
    this.creationCompteForm.prenom = "";
    this.creationCompteForm.login = "";
    this.creationCompteForm.mdp = "";
    this.creationCompteForm.adresse = "";
    this.creationCompteForm.codePostal = null;
    this.creationCompteForm.ville = "";
    this.creationCompteForm.email = "";
    this.creationCompteForm.tel = "";
    this.creationCompteForm.numSecSociale = "";
  }

  creerCompte() {
    this.user = new Utilisateur(0, this.creationCompteForm.nom,this.creationCompteForm.prenom,
        this.creationCompteForm.login, this.creationCompteForm.mdp,this.creationCompteForm.adresse,
        this.creationCompteForm.codePostal,this.creationCompteForm.ville,this.creationCompteForm.email,
        this.creationCompteForm.tel,this.creationCompteForm.numSecSociale, "");
        
        this.utilisateurService.createUser(this.user).subscribe(utilisateur => {
          console.log(utilisateur);
          this.ngOnInit();
          this.routeur.navigateByUrl('/authentification');
        }, (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
                console.log('Client-side error occured.');
            } else {
                console.log('Server-side error occured.');
            }
        });
  }
}