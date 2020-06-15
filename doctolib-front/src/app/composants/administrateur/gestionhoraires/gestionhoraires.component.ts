import { Component, OnInit } from '@angular/core';
import { Horaires } from '../../../entites/Horaire';

@Component({
  selector: 'app-gestionhoraires',
  templateUrl: './gestionhoraires.component.html',
  styleUrls: ['./gestionhoraires.component.css']
})
export class GestionhorairesComponent implements OnInit {

  horaires: Horaires[] = [];

  lundidebutTimeAM: Date;
  lundifinTimeAM: Date;
  lundidebutTimePM: Date;
  lundifinTimePM: Date;
  mardidebutTimeAM: Date;
  mardifinTimeAM: Date;
  mardidebutTimePM: Date;
  mardifinTimePM: Date;
  mercredidebutTimeAM: Date;
  mercredifinTimeAM: Date;
  mercredidebutTimePM: Date;
  mercredifinTimePM: Date;
  jeudidebutTimeAM: Date;
  jeudifinTimeAM: Date;
  jeudidebutTimePM: Date;
  jeudifinTimePM: Date;
  vendredidebutTimeAM: Date;
  vendredifinTimeAM: Date;
  vendredidebutTimePM: Date;
  vendredifinTimePM: Date;
  samedidebutTimeAM: Date;
  samedifinTimeAM: Date;
  samedidebutTimePM: Date;
  samedifinTimePM: Date;

  constructor() { }

  ngOnInit(): void {
    //let nowDate : Date = new Date();
    //nowDate.setHours(15);
    //nowDate.setMinutes(15);
    //this.lundifinTimeAM = nowDate;
  }

  saveHoraires() {
    let hourAM: number;
    let minutesAM: number;
    let hourPM: number;
    let minutesPM: number;

    hourAM = this.lundidebutTimeAM != null ? this.lundidebutTimeAM.getHours() : null;
    minutesAM = this.lundidebutTimeAM != null ? this.lundidebutTimeAM.getMinutes() : null;
    hourPM = this.lundidebutTimePM != null ? this.lundidebutTimePM.getHours() : null;
    minutesPM = this.lundidebutTimePM != null ? this.lundidebutTimePM.getMinutes() : null;
    let horaireLundi: Horaires = new Horaires("Lundi", hourAM, minutesAM, hourPM, minutesPM);

    hourAM = this.mardidebutTimeAM != null ? this.mardidebutTimeAM.getHours() : null;
    minutesAM = this.mardidebutTimeAM != null ? this.mardidebutTimeAM.getMinutes() : null;
    hourPM = this.mardidebutTimePM != null ? this.mardidebutTimePM.getHours() : null;
    minutesPM = this.mardidebutTimePM != null ? this.mardidebutTimePM.getMinutes() : null;
    let horaireMardi: Horaires = new Horaires("Mardi", hourAM, minutesAM, hourPM, minutesPM);

    hourAM = this.mercredidebutTimeAM != null ? this.mercredidebutTimeAM.getHours() : null;
    minutesAM = this.mercredidebutTimeAM != null ? this.mercredidebutTimeAM.getMinutes() : null;
    hourPM = this.mercredidebutTimePM != null ? this.mercredidebutTimePM.getHours() : null;
    minutesPM = this.mercredidebutTimePM != null ? this.mercredidebutTimePM.getMinutes() : null;
    let horaireMercredi: Horaires = new Horaires("Mercredi", hourAM, minutesAM, hourPM, minutesPM);

    hourAM = this.jeudidebutTimeAM != null ? this.jeudidebutTimeAM.getHours() : null;
    minutesAM = this.jeudidebutTimeAM != null ? this.jeudidebutTimeAM.getMinutes() : null;
    hourPM = this.jeudidebutTimePM != null ? this.jeudidebutTimePM.getHours() : null;
    minutesPM = this.jeudidebutTimePM != null ? this.jeudidebutTimePM.getMinutes() : null;
    let horaireJeudi: Horaires = new Horaires("Jeudi", hourAM, minutesAM, hourPM, minutesPM);

    hourAM = this.vendredidebutTimeAM != null ? this.vendredidebutTimeAM.getHours() : null;
    minutesAM = this.vendredidebutTimeAM != null ? this.vendredidebutTimeAM.getMinutes() : null;
    hourPM = this.vendredidebutTimePM != null ? this.vendredidebutTimePM.getHours() : null;
    minutesPM = this.vendredidebutTimePM != null ? this.vendredidebutTimePM.getMinutes() : null;
    let horaireVendredi: Horaires = new Horaires("Vendredi", hourAM, minutesAM, hourPM, minutesPM);

    hourAM = this.samedidebutTimeAM != null ? this.samedidebutTimeAM.getHours() : null;
    minutesAM = this.samedidebutTimeAM != null ? this.samedidebutTimeAM.getMinutes() : null;
    hourPM = this.samedidebutTimePM != null ? this.samedidebutTimePM.getHours() : null;
    minutesPM = this.samedidebutTimePM != null ? this.samedidebutTimePM.getMinutes() : null;
    let horaireSamedi: Horaires = new Horaires("Samedi", hourAM, minutesAM, hourPM, minutesPM);

    this.horaires.push(horaireLundi);
    this.horaires.push(horaireMardi);
    this.horaires.push(horaireMercredi);
    this.horaires.push(horaireJeudi);
    this.horaires.push(horaireVendredi);
    this.horaires.push(horaireSamedi);

    this.horaires.forEach(e => console.log(e.toJson(e)));
  }
}
