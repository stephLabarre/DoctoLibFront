import { Component, OnInit } from '@angular/core';
import { Horaires } from '../../../entites/Horaire';

@Component({
  selector: 'app-gestionhoraires',
  templateUrl: './gestionhoraires.component.html',
  styleUrls: ['./gestionhoraires.component.css']
})
export class GestionhorairesComponent implements OnInit {

  public horairesList: Horaires[] = [];

  nowDebut: Date = new Date();
  nowFin: Date = new Date();
  vendredi: Date = new Date();
  samedi: Date = new Date();

  constructor() { }

  ngOnInit(): void {
    this.nowDebut.setHours(9);
    this.nowDebut.setMinutes(0);
    this.nowFin.setHours(12);
    this.nowFin.setMinutes(30);
    this.vendredi.setHours(18);
    this.vendredi.setMinutes(45);
    this.samedi.setHours(12);
    this.samedi.setMinutes(45);

    console.log("HEURE DEBUT=" + this.nowDebut + " HEURE FIN=" + this.nowFin);
    console.log("HEURE VENDREDI=" + this.vendredi + " HEURE VENDREDI=" + this.vendredi);
    this.horairesList.push(new Horaires("Lundi", this.nowDebut, this.nowDebut, this.nowFin, this.nowFin));
    this.horairesList.push(new Horaires("Mardi", this.nowDebut, this.nowFin, this.nowDebut, this.nowFin));
    this.horairesList.push(new Horaires("Mercredi", this.nowDebut, this.nowFin, this.nowDebut, this.nowFin));
    this.horairesList.push(new Horaires("Jeudi", this.nowDebut, this.nowFin, this.nowDebut, this.nowFin));
    this.horairesList.push(new Horaires("Vendredi", this.vendredi, this.vendredi, this.vendredi, this.vendredi));
    this.horairesList.push(new Horaires("Samedi",this.vendredi, this.vendredi, this.samedi, this.samedi));
    this.horairesList.forEach(e => {
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
    this.horairesList.forEach(e => {
      console.log("-----");
      console.log(e.debutAMHour);
      console.log(e.finAMHour);
      console.log(e.debutPMHour);
      console.log(e.finPMHour);
    });
  }
}
