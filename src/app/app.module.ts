import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CandidateFormComponent } from './components/candidate-form/candidate-form.component';
import { CandidateQuestionsComponent } from './components/candidate-questions/candidate-questions.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { MatChipsModule } from '@angular/material/chips'
import { HttpClientModule } from '@angular/common/http';
import { CandidateSubmitComponent } from './components/candidate-submit/candidate-submit.component';

@NgModule({
  declarations: [
    AppComponent,
    CandidateFormComponent,
    CandidateQuestionsComponent,
    CandidateSubmitComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
