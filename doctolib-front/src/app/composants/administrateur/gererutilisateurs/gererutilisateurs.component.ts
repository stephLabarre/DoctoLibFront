import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { Utilisateur } from '../../../entites/Utilisateur';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-gererutilisateurs',
  templateUrl: './gererutilisateurs.component.html',
  styleUrls: ['./gererutilisateurs.component.css']
})
export class GererutilisateursComponent implements OnInit {

  public usersList: Utilisateur[] = [];

  public user: Utilisateur = null;

  constructor(private utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
    this.getAllUsers();
    console.log("Taille du tableau des utilisateurs = " + this.usersList.length);
  }

  getAllUsers() {
    this.utilisateurService.getAllUsers().subscribe(users => {
      this.usersList = users;   
      this.usersList.forEach(e => console.log("User name:"+e.nom + " With id:" + e.id));
    }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
            console.log('Client-side error occured.');
        } else {
            console.log('Server-side error occured.');
        }
    });    
  }

  deleteUser(user: Utilisateur) {
    console.log("Delete User:" + user.id + "," + user.nom);
    this.utilisateurService.deleteUser(user.id).subscribe(user => {
      console.log("Utilisateur supprimé : " + JSON.stringify(user));
      this.user = null;
      this.ngOnInit();
    }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
            console.log('Client-side error occured.');
        } else {
            console.log('Server-side error occured.');
        }
    });    
    
  }

  updateUser(user: Utilisateur) {
     this.user = user;   
  }

  save(user: Utilisateur) {
    console.log("Update User:" + user.id + "," + user.nom);
    this.utilisateurService.updateUser(user).subscribe(user => {
      console.log("Utilisateur supprimé : " + JSON.stringify(user));
      this.user = null;
      this.ngOnInit();
    }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
            console.log('Client-side error occured.');
        } else {
            console.log('Server-side error occured.');
        }
    }); 
  }
}
