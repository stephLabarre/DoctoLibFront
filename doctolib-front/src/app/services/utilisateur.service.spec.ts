import { UtilisateurService } from './utilisateur.service';
import {
  HttpClientTestingModule,
  HttpTestingController
  } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

describe('UtilisateurService', () => {
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [UtilisateurService]
      });
    });

  it(
    'should be initialized',
    inject([UtilisateurService], (utilisateurService: UtilisateurService) => {
      console.log("TEST");
      let baseURL = utilisateurService.baseUrl;
      console.log("BASE URL + " + baseURL);
      expect(baseURL).toEqual("http://localhost:8080/");     
    })
  );
});
