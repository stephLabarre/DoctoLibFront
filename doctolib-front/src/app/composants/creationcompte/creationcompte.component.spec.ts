import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationcompteComponent } from './creationcompte.component';

describe('CreationcompteComponent', () => {
  let component: CreationcompteComponent;
  let fixture: ComponentFixture<CreationcompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationcompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationcompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
