import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UploadedFile } from '../types/files';
import { ReadyApplicationData } from '../types/application-form';
import { Observable, Observer, from, of, Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HandleFormService {
  candidateForm: FormGroup;
  candidateQuestions: FormGroup;
  private countriesApiUrl: string =
    'https://restcountries.com/v3.1/all';
  countryList$: Observable<any>;
  formStep: number = 0;
  isPrevButtonDisabled: boolean = true;
  isFormValid: boolean = true;
  uploadedFiles: UploadedFile[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  private validateCountriesData(country: any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const getCountryName = country.altSpellings
      observer.next(getCountryName)
      observer.complete()
    })
  }

  activateFormHandling() {
    this.formStep = 1;
    this.countryList$ = this.http.get<any>(this.countriesApiUrl)
    // this.countryList$.pipe(concatMap((country: any) => this.validateCountriesData(country))).
    // subscribe(test => console.log('test :>> ', test))
    this.countryList$.subscribe(country => console.log('country :>> ', country))


    this.candidateForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      links: this.fb.array([]),
    });

    this.candidateQuestions = this.fb.group({
      allowToWork: ['', Validators.required],
      prevEmployed: ['', Validators.required],
      gender: '',
      appliedPlatform: '',
    });
  }

  removeAttachment(file: UploadedFile) {
    const fileIndex = this.uploadedFiles.indexOf(file);
    this.uploadedFiles.splice(fileIndex, 1);
  }
}
