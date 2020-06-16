import { Injectable } from '@angular/core';
import { Utilisateur } from '../entites/Utilisateur'; 
import {HttpClient, HttpHeaders} from'@angular/common/http'; 
import { Observable } from'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  urlCreate: string = 'http://localhost:8080/utilisateur';

  user: Utilisateur;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  createUser(utilisateur: Utilisateur): Observable<Utilisateur> {
    this.user = utilisateur;
    return this.httpClient.post<Utilisateur>(this.urlCreate, this.user, this.httpOptions);
  }
}
