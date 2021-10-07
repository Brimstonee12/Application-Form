import { Injectable } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HandleFormService {

  candidateForm: FormGroup;
  constructor(public fb: FormBuilder) { }

  formStep: string
  activateFormHandling() {
    this.formStep = '1'
    
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
