import { Component } from '@angular/core';
import { HandleFormService } from '../../services/handle-form.service';

@Component({
  selector: 'app-application-send',
  templateUrl: './application-send.component.html',
  styleUrls: ['./application-send.component.scss'],
})
export class ApplicationSendComponent {

  constructor(public handleFormService: HandleFormService) {}
}
