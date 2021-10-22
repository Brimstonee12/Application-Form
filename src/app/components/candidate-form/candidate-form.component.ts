import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HandleFormService } from '../../services/handle-form.service';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss'],
})
export class CandidateFormComponent implements OnInit {
  constructor(public handleFormService: HandleFormService,
    public fb: FormBuilder) {}

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
  //test file upload
  fileToUpload: File | null = null;
  fileBrowseHandler(file:any){
    this.fileToUpload = file.item(0);
    console.log('this.fileUpload :>> ', this.fileToUpload);
    console.log('file :>> ', file);
  }
  ngOnInit(): void {
    if (this.handleFormService.formStep === 0) {
      this.handleFormService.activateFormHandling();
    }
  }
}
