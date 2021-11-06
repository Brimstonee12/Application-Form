import { Component } from '@angular/core';
import { HandleFormService } from './services/handle-form.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  validationErrorMsg: string = 'Please correct all fields before continue';

  constructor(public handleFormService: HandleFormService) {}

  handleProgressBar() {
    switch (this.handleFormService.formStep) {
      case 2:
        return 50;
      case 3:
        return 100;
      default:
        return 0;
    }
  }

  handleButtonStep(step: string) {
    if (step === 'prev') {
      this.handleFormService.formStep--;
      if (this.handleFormService.formStep <= 1) {
        this.handleFormService.isPrevButtonDisabled = true;
      }
    } else if (step === 'next' && this.currentStepIsValid) {
      this.handleFormService.formStep++;
      this.handleFormService.isFormValid = true;
      if (this.handleFormService.formStep > 1) {
        this.handleFormService.isPrevButtonDisabled = false;
      }
    } else if (step === 'next' && !this.currentStepIsValid) {
      this.handleFormService.isFormValid = false;
    }
  }

  get currentStepIsValid() {
    return (
      (this.handleFormService.formStep === 1 &&
        this.handleFormService.candidateForm.valid &&
        this.handleFormService.uploadedFiles.length > 0) ||
      (this.handleFormService.formStep === 2 &&
        this.handleFormService.candidateQuestions.valid)
    );
  }

  //WITHOUT STEP VALIDATION
  // handleButtonStep(step: string) {
  //   if (step === 'prev') {
  //     this.handleFormService.formStep--;
  //     if (this.handleFormService.formStep <= 1) {
  //       this.handleFormService.isPrevButtonDisabled = true;
  //     }
  //   } else if (
  //     step === 'next'
  //   ) {
  //     this.handleFormService.formStep++;
  //     this.handleFormService.isFormValid = true;
  //     if (this.handleFormService.formStep > 1) {
  //       this.handleFormService.isPrevButtonDisabled = false;
  //     }
  //   }
  // }
}
