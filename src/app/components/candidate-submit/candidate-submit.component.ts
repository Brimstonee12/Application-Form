import { Component, OnInit } from '@angular/core';
import { HandleFormService } from '../../services/handle-form.service';
import { ReadyApplicationData, ValueData } from '../../types/application-form';
@Component({
  selector: 'app-candidate-submit',
  templateUrl: './candidate-submit.component.html',
  styleUrls: ['./candidate-submit.component.scss'],
})
export class CandidateSubmitComponent implements OnInit {
  constructor(private handleFormService: HandleFormService) {}

  mockReadyData: ReadyApplicationData[] = [
    { name: 'First Name', value: '' },
    { name: 'Last Name', value: '' },
    { name: 'Email', value: '' },
    { name: 'Phone', value: '' },
    { name: 'Country', value: '' },
    { name: 'City', value: '' },
    { name: 'Links', value: [] },
    { name: 'Are you allow to work in this country?', value: '' },
    { name: 'Have you been previously employed by ThisCompany?', value: '' },
    { name: 'Gender', value: '' },
    { name: 'Job Board', value: '' },
    { name: 'Attachements', value: [] },
  ];

  private getDataFromCandidateForm() {
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

  private prepareDataForApi() {
    const applicationFormData = this.getDataFromCandidateForm();
    let item = 0;
    for (let readyItem of this.mockReadyData) {
      readyItem.value = applicationFormData[item];
      item++;
    }
  }

  isStringValue(value: ValueData) {
    return typeof value === 'string';
  }

  ngOnInit(): void {
    this.prepareDataForApi();
  }
}
