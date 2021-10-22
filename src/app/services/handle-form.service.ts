import { Injectable } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../types/country';

@Injectable({
  providedIn: 'root',
})
export class HandleFormService {
  public candidateForm: FormGroup;
  private countriesApiUrl: string =
    'https://api.smartrecruiters.com/v1/companies/smartrecruiters/postings';
  public countryList$: Observable<any>;
  public formStep: number = 0;
  public isPrevButtonDisabled: boolean = true;
  public countriesList: any;
  public isFormValid: boolean = true;
  public attachedFiles: File[];
  public fakeCountry = [
    { id: 1, name: 'Arabia' },
    { id: 2, name: 'Poland' },
    { id: 3, name: 'USA' },
    { id: 4, name: 'United Kingdom' },
  ];

  constructor(public fb: FormBuilder, private http: HttpClient) {}

  activateFormHandling() {
    this.formStep = 1;
    this.countryList$ = this.http.get<any>(this.countriesApiUrl);
    this.countryList$.subscribe((res) => (this.countriesList = res));

    this.candidateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      links: this.fb.array([]),
    });
  }
}
