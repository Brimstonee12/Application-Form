import { Component } from '@angular/core';
import { HandleFormService } from './services/handle-form.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public handleFormService: HandleFormService) {}

  handleProgressBar() {
    switch (this.handleFormService.formStep) {
      case 2:
        return 50;
      case 3:
        return 100;
      default:
        return 0
    }
  }

  handleButtonStep(step: string) {
    if (step === 'prev') {
      this.handleFormService.formStep--;
      if (this.handleFormService.formStep <= 1) {
        this.handleFormService.isPrevButtonDisabled = true;
      }
    } else if (step === 'next') {
      this.handleFormService.formStep++;
      if (this.handleFormService.formStep > 1) {
        this.handleFormService.isPrevButtonDisabled = false;
      }
    }
  }
}
