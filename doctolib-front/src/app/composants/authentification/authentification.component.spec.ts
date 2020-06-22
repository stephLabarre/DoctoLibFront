import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AuthentificationComponent } from './authentification.component';
import { UtilisateurService } from '../../services/utilisateur.service'; 

xdescribe('AuthentificationComponent', () => {
  let authentificationComponent: AuthentificationComponent;
  let utilisateurService: UtilisateurService;

  beforeEach(inject( [AuthentificationComponent, UtilisateurService], (_c: AuthentificationComponent, _s: UtilisateurService) => {
    authentificationComponent = _c;
    utilisateurService = _s;
  }));
});