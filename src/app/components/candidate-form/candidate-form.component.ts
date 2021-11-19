import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { HandleFormService } from '../../services/handle-form.service';
@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss'],
})
export class CandidateFormComponent implements OnInit {
  dupa = false
  constructor(
    public handleFormService: HandleFormService,
    private fb: FormBuilder
  ) {}

  get formLinks() {
    return this.handleFormService.candidateForm.get('links') as FormArray;
  }

  get form() {
    return this.handleFormService.candidateForm.controls;
  }

  addLinkField() {
    const dynamicLink = this.fb.group({
      link: ['', [Validators.required]],
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
