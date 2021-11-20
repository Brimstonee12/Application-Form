import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UploadedFile } from '../types/files';
import { ReadyApplicationData } from '../types/application-form';
import { Country } from "../types/country"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HandleFormService {
  candidateForm: FormGroup;
  candidateQuestions: FormGroup;
  private countriesApiUrl: string = 'https://restcountries.com/v3.1/all';
  countryList$: Observable<Country[]>;
  formStep: number = 0;
  isPrevButtonDisabled: boolean = true;
  isFormValid: boolean = true;
  uploadedFiles: UploadedFile[] = [];
  acceptTerms: boolean = false;
  applicationSend: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  activateFormHandling() {
    this.formStep = 1;
    this.countryList$ = this.http.get<Country[]>(this.countriesApiUrl);
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

  sendApplication() {
    this.applicationSend = true
    //there will be shot to db
    this.uploadedFiles = []
    this.candidateForm.reset()
    this.candidateQuestions.reset()
  }

  returnToNewApplication(){
    this.applicationSend = false
    this.formStep = 0;
    this.acceptTerms = false;
  }
}
