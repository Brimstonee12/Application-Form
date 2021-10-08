import { Injectable } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from "../types/country";

@Injectable({
  providedIn: 'root'
})
export class HandleFormService {

  candidateForm: FormGroup;
  private countriesApiUrl: string = 'https://api.smartrecruiters.com/v1/companies/smartrecruiters/postings';
  public countryList$: Observable<any>;
  formStep: string = ""
  public countriesList: any;

  constructor(public fb: FormBuilder,
    private http: HttpClient
    ) { }


  activateFormHandling() {
    this.formStep = '1'
    // this.countryList$ = this.http.get<any>(this.countriesApiUrl)
    // this.countryList$.subscribe(res => this.countriesList = res)

    this.countryList$ = this.http.get<any>(this.countriesApiUrl);
    this.countryList$.subscribe((res) => (this.countriesList = res));

    this.candidateForm = this.fb.group({
      name: [],
      lastName: [],
      email: ['', [Validators.required, Validators.email]],
      phones: this.fb.array([]),
      country: [],
      city: [],
    });
  }

}
