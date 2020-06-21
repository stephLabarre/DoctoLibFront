import { TestBed } from '@angular/core/testing';

import { HoraireService } from './horaire.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HoraireService', () => {
  let service: HoraireService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
          HttpClientTestingModule 
        ],
        providers: [ 
          HoraireService 
        ]
    });
    service = TestBed.inject(HoraireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
