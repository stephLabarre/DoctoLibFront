import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from'@angular/common/http'; 
import { Observable } from'rxjs'; 
import { Horaires } from '../../entites/Horaires';

@Injectable({
  providedIn: 'root'
})
export class HoraireService {

  baseUrl: string = 'http://localhost:8080/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getHoraires(): Observable<Horaires[]> {
    return this.httpClient.get<Horaires[]>(this.baseUrl + "horaires");
  }

  saveHoraire(horaires: Horaires): Observable<Horaires> {
    return this.httpClient.post<Horaires>(this.baseUrl + "horaire", horaires, this.httpOptions);
  }
}
