import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { AppComponent } from 'src/app/app.component';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private routeur: Router, private loginService: LoginService,  private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.loginService.isNotAdmin();
    this.appComponent.show = false;
    this.appComponent.admin = false;
    this.routeur.navigateByUrl('/authentification');
  }
}
