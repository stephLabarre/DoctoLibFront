import { Component, OnInit } from '@angular/core';
import { Horaires } from '../../../entites/Horaires';
import { HoraireService } from '../../../services/horaires/horaire.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gestionhoraires',
  templateUrl: './gestionhoraires.component.html',
  styleUrls: ['./gestionhoraires.component.css']
})
export class GestionhorairesComponent implements OnInit {

  public horairesList: Horaires[] = [];

  public jours: string[] = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

  /*
  nowDebut: Date = new Date();
  nowFin: Date = new Date();
  vendredi: Date = new Date();
  samedi: Date = new Date();
  */
  constructor(private horaireService: HoraireService) { }

  ngOnInit() {
/*  
    this.horairesList.push(new Horaires("Lundi",null, null, null, null));
    this.horairesList.push(new Horaires("Mardi", new Date(), new Date(), new Date(), new Date()));
    this.horairesList.push(new Horaires("Mercredi", new Date(), new Date(), new Date(), new Date()));
    this.horairesList.push(new Horaires("Jeudi", new Date(), new Date(), new Date(), new Date()));
    this.horairesList.push(new Horaires("Vendredi", new Date(), new Date(), new Date(), new Date()));
    this.horairesList.push(new Horaires("Samedi", new Date(), new Date(), new Date(), new Date()));
*/
    this.retreiveHoraires();
    console.log("Taille de la liste des horaires : " + this.horairesList.length);
  }

  retreiveHoraires() {
    console.log("Etape 1");
    let horaires: Horaires[] = [];
    let tmp: Observable<Horaires[]> = this.horaireService.getHoraires();
    
    tmp.subscribe(horaire => {
      horaires = horaire;   
      this.formatHoraire(horaires);
      console.log("Etape 3");
      console.log("Data from BDD = " + JSON.stringify(horaires));
      console.log("Data Target Retreive = " + JSON.stringify(this.horairesList));
    }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
            console.log('Client-side error occured.');
        } else {
            console.log('Server-side error occured.');
        }
    });  
    console.log("Etape 4");
  }

  formatHoraire (horaires: Horaires[])  {
    console.log("Etape 2");
    for (let entry of this.jours) {
      console.log("Jour de la semaine : " + entry);
      let h: Horaires = horaires.find(e => e.jour === entry);
      if (h != null) {
        console.log("DATA Before: " + JSON.stringify(h));
        let dateDAM: Date;
        let dateFAM: Date;
        let dateDPM: Date;
        let dateFPM: Date;

        if (h.debutAMHour != null) {
          dateDAM = new Date(h.debutAMHour);
          console.log("DEBUT AM BDD = " + h.debutAMHour);
          console.log("DEBUT AM DATA = " + dateDAM);
        } else {
          dateDAM = null;
        }
        if (h.finAMHour != null) {
          dateFAM = new Date(h.finAMHour);
          console.log("DEBUT AM BDD = " + h.finAMHour);
          console.log("DEBUT AM DATA = " + dateFAM);
        } else {
          dateFAM = null;
        }
        if (h.debutPMHour != null) {
          dateDPM = new Date(h.debutPMHour);
        } else {
          dateDPM = null;
        }
        if (h.finPMHour != null) {
          dateFPM = new Date(h.finPMHour);
        } else {
          dateFPM = null;
        }
        let horaireTmp: Horaires = new Horaires(h.jour, dateDAM, dateFAM, dateDPM, dateFPM); 
        console.log("DATA After: " + JSON.stringify(horaireTmp));
        this.horairesList.push(horaireTmp);
      } else {
        this.horairesList.push(new Horaires(entry, null, null, null, null));
      }
    }
  }

  saveHoraires() {
    console.log("SAVE RESUTLS");
    for (let en of this.horairesList) {
      console.log("======");
      console.log(JSON.stringify(en));
    }
    this.horairesList.map(hor => {
      let dateDAM: Date = new Date();
      let dateFAM: Date = new Date();
      let dateDPM: Date  = new Date();
      let dateFPM: Date  = new Date();
      let h: Number;
      let m: Number;

      if (hor.debutAMHour != null) {
        dateDAM = new Date(hor.debutAMHour);
      } else {
        dateDAM = null;
      }
      if (hor.finAMHour != null) {
        dateFAM = new Date(hor.finAMHour);
      } else {
        dateFAM = null;
      }
      if (hor.debutPMHour != null) {
        dateDPM = new Date(hor.debutPMHour);
      } else {
        dateDPM = null;
      }
      if (hor.finPMHour != null) {
        dateFPM = new Date(hor.finPMHour);
      } else {
        dateFPM = null;
      }
      hor.debutAMHour = dateDAM;
      hor.finAMHour = dateFAM;
      hor.debutPMHour = dateDPM;
      hor.finPMHour = dateFPM;
      return new Horaires(hor.jour, hor.debutAMHour, hor.finAMHour, hor.debutPMHour, hor.finPMHour);
    }).forEach(e => {
    
      this.horaireService.saveHoraire(e).subscribe(h => {
          console.log("-----");
          console.log("SAVE DATA + " + JSON.stringify(h));          
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
