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
  
  /*
  it('should be logged in', () => {
    let utilisateur = new Utilisateur(0, "","", "titi", "titi","", 0,"","","","", "");
    spyOn(utilisateurService, 'loggedUser').and.callFake(() => {
      return Observable.from(utilisateur);
    });
    authentificationComponent.login();

    expect(authentificationComponent.user.login).toBe('titi');
    expect(component.user.mdp).toBe('titi');
  });
*/
  /*
  let fixture: ComponentFixture<AuthentificationComponent>;

  let utilisateur: Observable<Utilisateur>;

  let spyUtilisateurService = jasmine.createSpyObj('spyUtilisateurService', ['loggedUser']);
  spyUtilisateurService.loggedUser.and.returnValue(utilisateur);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthentificationComponent ],
      providers: [ AuthentificationComponent, {
        provide: UtilisateurService, 
        useValue: spyUtilisateurService
      } ]
    })
    .compileComponents();
  }));

  let component: AuthentificationComponent; 

  beforeEach(inject( [AuthentificationComponent], (_s: AuthentificationComponent) => {
    component = _s;
  }));
*/
  /*
  it('should be logged in', () => {
    let utilisateur = new Utilisateur(0, "","", "titi", "titi","", 0,"","","","", "");
    component.login();
    expect(this.spyUtilisateurService.loggedUser).toHaveBeenCalledWith(utilisateur);
    expect(component.user.login).toBe('titi');
    expect(component.user.mdp).toBe('titi');
  });
*/
});