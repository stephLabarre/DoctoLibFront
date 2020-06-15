import { Component, OnInit } from '@angular/core';
import { Horaires } from '../../../entites/Horaire';

@Component({
  selector: 'app-gestionhoraires',
  templateUrl: './gestionhoraires.component.html',
  styleUrls: ['./gestionhoraires.component.css']
})
export class GestionhorairesComponent implements OnInit {

  horaires: Horaires[] = [];

  constructor() { }

  ngOnInit(): void {
    let now: Date = new Date();
    this.horaires.push(new Horaires("Lundi", now.setHours(4), now.setMinutes(15), now.setHours(14), now.setMinutes(55)));
    this.horaires.push(new Horaires("Mardi", null, null, null, null));
    this.horaires.push(new Horaires("Mercredi", null, null, null, null));
    this.horaires.push(new Horaires("Jeudi", null, null, null, null));
    this.horaires.push(new Horaires("Vendredi", null, null, null, null));
    this.horaires.push(new Horaires("Samedi", null, null, null, null));
  }

  saveHoraires() {
    this.horaires.forEach(e => {
      console.log(e.debutAMHour);
      console.log(e.debutAMHour);
    });
  }
}
