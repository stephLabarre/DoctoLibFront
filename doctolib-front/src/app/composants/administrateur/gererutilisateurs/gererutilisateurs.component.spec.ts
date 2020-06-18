import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GererutilisateursComponent } from './gererutilisateurs.component';

describe('GererutilisateursComponent', () => {
  let component: GererutilisateursComponent;
  let fixture: ComponentFixture<GererutilisateursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GererutilisateursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GererutilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
