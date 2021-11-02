import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HandleFormService } from '../../services/handle-form.service';
import { Observable, Observer } from 'rxjs';
import { UploadedFile, UploadError} from "../../types/files"
@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss'],
})
export class CandidateFormComponent implements OnInit {

  constructor(public handleFormService: HandleFormService,
    public fb: FormBuilder) {}

    public fakeCountry = [
      { id: 1, name: 'Arabia' },
      { id: 2, name: 'Poland' },
      { id: 3, name: 'USA' },
      { id: 4, name: 'United Kingdom' },
    ];
    
  get formLinks() {
    return this.handleFormService.candidateForm.get('links') as FormArray;
  }

  get formName() {
    return this.handleFormService.candidateForm.get('name');
  }

  get formLastName() {
    return this.handleFormService.candidateForm.get('lastName');
  }

  get formEmail() {
    return this.handleFormService.candidateForm.get('email');
  }

  get formPhone() {
    return this.handleFormService.candidateForm.get('phone');
  }

  get formCountry() {
    return this.handleFormService.candidateForm.get('country');
  }

  get formCity() {
    return this.handleFormService.candidateForm.get('city');
  }

  addLinkField() {
    const dynamicLink = this.fb.group({
      link: []
    });

    this.formLinks.push(dynamicLink);
  }

  deleteLinkField(linkField) {
    this.formLinks.removeAt(linkField);
  }

  ngOnInit(): void {
    if (this.handleFormService.formStep === 0) {
      this.handleFormService.activateFormHandling();
    }
  }
}
