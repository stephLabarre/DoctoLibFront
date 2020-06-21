import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthentificationComponent } from './authentification.component';
import { UtilisateurService } from '../../services/utilisateur.service';

describe('AuthentificationComponent', () => {
  let component: AuthentificationComponent;
  let fixture: ComponentFixture<AuthentificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UtilisateurService],
      declarations: [ AuthentificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
