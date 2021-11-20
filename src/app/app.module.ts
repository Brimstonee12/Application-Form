import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CandidateFormComponent } from './components/candidate-form/candidate-form.component';
import { CandidateQuestionsComponent } from './components/candidate-questions/candidate-questions.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { MatChipsModule } from '@angular/material/chips'
import { HttpClientModule } from '@angular/common/http';
import { CandidateSubmitComponent } from './components/candidate-submit/candidate-submit.component';
import { FormsModule } from '@angular/forms';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { MatRadioModule } from '@angular/material/radio';
import { SortByPipe } from "../app/pipes/sort-by.pipe";
import { ApplicationSendComponent } from './components/application-send/application-send.component'
@NgModule({
  declarations: [
    AppComponent,
    CandidateFormComponent,
    CandidateQuestionsComponent,
    CandidateSubmitComponent,
    FileUploaderComponent,
    SortByPipe,
    ApplicationSendComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatChipsModule,
    MatRadioModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
