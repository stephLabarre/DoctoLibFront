import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'doctolib-front';

  show: boolean;
  admin: boolean;

  constructor(private routeur: Router) {
    this.show = false;
    this.admin = false;
    this.routeur.navigateByUrl('/authentification');    
  }  
}
