import { Injectable } from '@angular/core';
import { Utilisateur } from '../entites/Utilisateur'; 
import {HttpClient, HttpHeaders} from'@angular/common/http'; 
import { Observable } from'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  baseUrl: string = 'http://localhost:8080/';

  user: Utilisateur;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  createUser(utilisateur: Utilisateur): Observable<Utilisateur> {
    this.user = utilisateur;
    return this.httpClient.post<Utilisateur>(this.baseUrl + "utilisateur", this.user, this.httpOptions);
  }

  getAllUsers(): Observable<Utilisateur[]> {
    return this.httpClient.get<Utilisateur[]>(this.baseUrl + "utilisateurs");
  }

  deleteUser(id: Number): Observable<Utilisateur> {
    console.log("URL Delete: " + this.baseUrl + "deleteUtilisateur/" + id);
    return this.httpClient.delete<Utilisateur>(this.baseUrl + "deleteUtilisateur/" + id, this.httpOptions);
  }

  updateUser(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.httpClient.put<Utilisateur>(this.baseUrl + "updateUtilisateur", utilisateur, this.httpOptions);
  }
}
