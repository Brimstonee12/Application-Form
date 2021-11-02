import { Injectable } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadedFile, UploadError } from '../types/files';

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
  public uploadedFiles: UploadedFile[] = [];

  constructor(public fb: FormBuilder, private http: HttpClient) {}

  public activateFormHandling() {
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

  public removeAttachment(file: UploadedFile) {
    const fileIndex = this.uploadedFiles.indexOf(file);
    this.uploadedFiles.splice(fileIndex, 1);
  }
}
