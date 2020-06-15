import { Component, OnInit } from '@angular/core';
import { Horaires } from '../../../entites/Horaire';

@Component({
  selector: 'app-gestionhoraires',
  templateUrl: './gestionhoraires.component.html',
  styleUrls: ['./gestionhoraires.component.css']
})
export class GestionhorairesComponent implements OnInit {

  public horaires: Horaires[] = [];

  constructor() { }

  ngOnInit(): void {
    let nowDebut: Date = new Date();
    let nowFin: Date = new Date();
    nowDebut.setHours(10);
    nowDebut.setMinutes(45);
    nowFin.setHours(13);
    nowFin.setMinutes(30);
    //    nowDebut.setHours(4);
//    nowFin.setMinutes(15);
    console.log("HEURE DEBUT=" + nowDebut + " HEURE FIN=" + nowFin);
    this.horaires.push(new Horaires("Lundi", nowDebut, nowFin, nowDebut, nowFin));
    this.horaires.push(new Horaires("Mardi", nowDebut, nowFin, nowDebut, nowFin));
    this.horaires.push(new Horaires("Mercredi", nowDebut, nowFin, nowDebut, nowFin));
    this.horaires.push(new Horaires("Jeudi", nowDebut, nowFin, nowDebut, nowFin));
    this.horaires.push(new Horaires("Vendredi", nowDebut, nowFin, null, null));
    this.horaires.push(new Horaires("Samedi", nowDebut, nowFin, nowDebut, nowFin));
    this.horaires.forEach(e => {
      console.log("======");
      console.log("Jour : " + e.jour);
      console.log("Debut AM : " + e.debutAMHour.getHours() + ":" + e.debutAMHour.getMinutes());
      console.log("Fin AM : " + e.finAMHour.getHours() + ":" + e.finAMHour.getMinutes());
      if (e.debutPMHour != null) {
        console.log("Debut PM : " + e.debutPMHour.getHours() + ":" + e.debutPMHour.getMinutes() );
      }
      if (e.finPMHour != null) {
        console.log("Fin PM : " + e.finPMHour.getHours() + ":" + e.finPMHour.getMinutes() );
      }
    });
  }

  saveHoraires() {
    this.horaires.forEach(e => {
      console.log("-----");
      console.log(e.debutAMHour);
      console.log(e.finAMHour);
      console.log(e.debutPMHour);
      console.log(e.finPMHour);
    });
  }
}
