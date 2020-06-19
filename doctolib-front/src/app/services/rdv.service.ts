import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from'@angular/common/http'; 
import { Observable } from'rxjs'; 
import { Rdv } from '../entites/Rdv';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  baseUrl: string = 'http://localhost:8080/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getRdvs(start: Date): Observable<Rdv[]> {
    let tmpDate = start.getTime();
    return this.httpClient.get<Rdv[]>(this.baseUrl + "rdvs?date=" + tmpDate);
  }

  saveRdv(rdv: Rdv): Observable<Rdv> {
    return this.httpClient.post<Rdv>(this.baseUrl + "ajouterRdv", rdv, this.httpOptions);
  }
}
