import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HandleFormService } from '../../services/handle-form.service';
import { Observable, Observer } from 'rxjs';
import { UploadedFile, UploadError} from "../../types/files"
@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss'],
})
export class CandidateFormComponent implements OnInit {

  constructor(public handleFormService: HandleFormService,
    public fb: FormBuilder) {}

  get formLinks() {
    return this.handleFormService.candidateForm.get('links') as FormArray;
  }

  get formName() {
    return this.handleFormService.candidateForm.get('name');
  }

  get formLastName() {
    return this.handleFormService.candidateForm.get('lastName');
  }

  get formEmail() {
    return this.handleFormService.candidateForm.get('email');
  }

  get formPhone() {
    return this.handleFormService.candidateForm.get('phone');
  }

  get formCountry() {
    return this.handleFormService.candidateForm.get('country');
  }

  get formCity() {
    return this.handleFormService.candidateForm.get('city');
  }

  addLinkField() {
    const dynamicLink = this.fb.group({
      link: []
    });

    this.formLinks.push(dynamicLink);
  }

  deleteLinkField(linkField) {
    this.formLinks.removeAt(linkField);
  }

  private isPdf(fileType: string): boolean {
    return fileType.match(/pdf\/*/) !== null;
  }
 // przeniesc walidacje do osobnego komponentu
  private validateFile(file: File): Observable<UploadedFile> {
      console.log('file :>> ', file);
      const fileReader = new FileReader();
      return new Observable((observer: Observer<UploadedFile>) => {
        fileReader.readAsDataURL(file);
        fileReader.onload = event => {
          const { type, name } = file 
          if(this.isPdf(type)){
            observer.next({file})
            observer.complete();
          }
          else {
            console.log('wrong Type :>> ');
            observer.error({error:{ name, errorMessage: 'INVALID_SIZE'}})
          }
        }
        fileReader.onerror = () => {
          const { name } = file 
          observer.error({error:{ name, errorMessage: 'INVALID_FILE'}})
        };
      })
  }
  
  fileBrowseHandler(fileData): void{
   this.validateFile(fileData.target.files[0]).subscribe(i => console.log('i :>> ', i))
  }
  ngOnInit(): void {
    if (this.handleFormService.formStep === 0) {
      this.handleFormService.activateFormHandling();
    }
  }
}
