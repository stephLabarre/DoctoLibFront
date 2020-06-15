import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionhorairesComponent } from './gestionhoraires.component';

describe('GestionhorairesComponent', () => {
  let component: GestionhorairesComponent;
  let fixture: ComponentFixture<GestionhorairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionhorairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionhorairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
