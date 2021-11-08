import { Component, OnInit } from '@angular/core';
import { HandleFormService } from '../../services/handle-form.service';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-candidate-questions',
  templateUrl: './candidate-questions.component.html',
  styleUrls: ['./candidate-questions.component.scss'],
})
export class CandidateQuestionsComponent implements OnInit {
  public jobBoardsList: string[] = [
    'LinkedIn',
    'Indeed',
    'NoFluufJobs',
    'PracujPL',
  ];
  constructor(public handleFormService: HandleFormService) {}

  ngOnInit(): void {}
}
