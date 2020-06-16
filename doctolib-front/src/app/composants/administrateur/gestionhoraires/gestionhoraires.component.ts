import { Component, OnInit } from '@angular/core';
import { Horaires } from '../../../entites/Horaires';
import { HoraireService } from '../../../services/horaires/horaire.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-gestionhoraires',
  templateUrl: './gestionhoraires.component.html',
  styleUrls: ['./gestionhoraires.component.css']
})
export class GestionhorairesComponent implements OnInit {

  public horairesList: Horaires[] = [];

  public jours: string[] = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

  nowDebut: Date = new Date();
  nowFin: Date = new Date();
  vendredi: Date = new Date();
  samedi: Date = new Date();

  constructor(private horaireService: HoraireService) { }

  ngOnInit(): void {
    let horaires: Horaires[] = [];
    this.horaireService.getHoraires().subscribe(horaire => {
      horaires = horaire;   
      for (let entry of this.jours) {
        console.log("Jour de la semaine : " + entry);
        let h: Horaires = horaires.find(e => e.jour === entry);
        if (h != null) {
          this.horairesList.push(new Horaires(h.jour, h.debutAMHour, h.finAMHour, h.debutPMHour, h.finPMHour));
        } else {
          this.horairesList.push(new Horaires(entry, null, null, null, null));
        }
      }     
      console.log("Data from BDD = " + JSON.stringify(horaires));
      console.log("Data Target Retreive = " + JSON.stringify(this.horairesList));
    }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
            console.log('Client-side error occured.');
        } else {
            console.log('Server-side error occured.');
        }
    });  
  }

  saveHoraires() {
    this.horairesList.forEach(e => {
      this.horaireService.saveHoraire(e).subscribe(h => {
          console.log("-----");
          console.log(h.jour);
          console.log(h.debutAMHour);
          console.log(h.finAMHour);
          console.log(h.debutPMHour);
          console.log(h.finPMHour);
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
              console.log('Client-side error occured.');
          } else {
              console.log('Server-side error occured.');
          }
      });
    });
  }
}
