import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadedFile } from '../types/files';
import { ReadyApplicationData } from '../types/application-form';
@Injectable({
  providedIn: 'root',
})
export class HandleFormService {
  candidateForm: FormGroup;
  candidateQuestions: FormGroup;
  private countriesApiUrl: string =
    'https://api.smartrecruiters.com/v1/companies/smartrecruiters/postings';
  private countryList$: Observable<any>;
  formStep: number = 0;
  isPrevButtonDisabled: boolean = true;
  isFormValid: boolean = true;
  uploadedFiles: UploadedFile[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  activateFormHandling() {
    this.formStep = 1;
    // this.countryList$ = this.http.get<any>(this.countriesApiUrl);
    // this.countryList$.subscribe((res) => (this.countriesList = res));

    this.candidateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
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
