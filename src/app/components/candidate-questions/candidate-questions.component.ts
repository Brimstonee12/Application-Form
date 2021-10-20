import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate-questions',
  templateUrl: './candidate-questions.component.html',
  styleUrls: ['./candidate-questions.component.scss']
})
export class CandidateQuestionsComponent implements OnInit {
  theName: string
  constructor() { }

  ngOnInit(): void {
  }

}
