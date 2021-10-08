import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HandleFormService } from '../../services/handle-form.service';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss'],
})
export class CandidateFormComponent implements OnInit {
  constructor(public handleFormService: HandleFormService) {}

  //glowne dane formy beda w serwisie i beda updateowane lokalnie w komponentach
  //czyli gettery i funkcje do dodawania beda w likalnych komponentach
  ngOnInit(): void {
    if (this.handleFormService.formStep === "") {
      this.handleFormService.activateFormHandling();
    }
  }
}
