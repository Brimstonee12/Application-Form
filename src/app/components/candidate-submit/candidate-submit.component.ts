import { Component, OnInit } from '@angular/core';
import { HandleFormService } from '../../services/handle-form.service';
@Component({
  selector: 'app-candidate-submit',
  templateUrl: './candidate-submit.component.html',
  styleUrls: ['./candidate-submit.component.scss'],
})
export class CandidateSubmitComponent implements OnInit {
  constructor(public handleFormService: HandleFormService) {}

  getDataFromCandidateForm() {
    const applicationData = [];
    for (const field in this.handleFormService.candidateForm.controls) {
      applicationData.push(
        this.handleFormService.candidateForm.controls[field].value
      );
    }
    for (const field in this.handleFormService.candidateQuestions.controls) {
      applicationData.push(
        this.handleFormService.candidateQuestions.controls[field].value
      );
    }
    applicationData.push(this.handleFormService.uploadedFiles);
    return applicationData;
  }

  prepareDataForApi() {
    const applicationFormData = this.getDataFromCandidateForm();
    let item = 0;
    for (let readyItem of this.handleFormService.readyDataApi) {
      readyItem.value = applicationFormData[item];
      item++;
    }
  }

  ngOnInit(): void {
    this.prepareDataForApi();
    console.log(' this.handleFormService.readyDataApi :>> ', this.handleFormService.readyDataApi);
  }
}
