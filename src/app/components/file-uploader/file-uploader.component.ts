import { Component } from '@angular/core';
import { HandleFormService } from '../../services/handle-form.service';
import { Observable, Observer, from, of, Subscription } from 'rxjs';
import {
  UploadedFile,
  UploadError,
  FilesErrorMessages,
} from '../../types/files';
import { concatMap, catchError, take } from 'rxjs/operators';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent {
  private fileSubscription: Subscription;
  filesError: boolean = false;
  fileErrorMessage: string;
  private filesErrorMessages: FilesErrorMessages = {
    invalidType: 'Your file has Invalid Type. We accept only .pdf files.',
    invalidSize: 'Your file is to big. We accept up to 10000kB.',
    invalidFile: 'Your file is Invalid.',
    invalidFilesLimit: 'Only 2 files can be attached.',
    invalidSystem: 'Something went wrong :(',
  };

  constructor(public handleFormService: HandleFormService) {}

  fileBrowseHandler(fileData) {
    const files = fileData?.target?.files;
    const numberOfFiles = files.length;
    this.fileSubscription = from(files)
      .pipe(
        concatMap((file: File) =>
          this.validateFile(file).pipe(
            catchError((error: UploadedFile) => of(error))
          )
        ),
        take(numberOfFiles)
      )
      .subscribe((validatedFile: UploadedFile) => {
        if (
          this.handleFormService.uploadedFiles.length <= 1 &&
          !validatedFile.error
        ) {
          this.handleFormService.uploadedFiles.push(validatedFile);
          this.filesError = false;
          fileData.target.value = '';
        } else {
          fileData.target.value = '';
          this.handleFileError(validatedFile.error);
        }
      });
  }

  private handleFileError(error: UploadError) {
    this.filesError = true;
    if (error) {
      this.fileErrorMessage = error.errorMessage;
    } else if (this.handleFormService.uploadedFiles.length >= 1) {
      this.fileErrorMessage = this.filesErrorMessages.invalidFilesLimit;
    } else {
      this.fileErrorMessage = this.filesErrorMessages.invalidSystem;
    }
  }

  private validateFile(file: File): Observable<UploadedFile> {
    const fileReader = new FileReader();
    return new Observable((observer: Observer<UploadedFile>) => {
      this.validateSize(file, observer);
      fileReader.readAsDataURL(file);
      fileReader.onload = (event) => {
        const { type, name } = file;
        if (this.isCorrectType(type)) {
          observer.next({ file });
          observer.complete();
        } else {
          observer.error({
            error: { name, errorMessage: this.filesErrorMessages.invalidType },
          });
        }
      };
      fileReader.onerror = () => {
        const { name } = file;
        observer.error({
          error: { name, errorMessage: this.filesErrorMessages.invalidFile },
        });
      };
    });
  }

  private isCorrectType(fileType: string): boolean {
    return fileType.match(/pdf\/*/) !== null;
  }

  private validateSize(file: File, observer: Observer<UploadedFile>): void {
    const { name, size } = file;
    if (!this.isValidSize(size)) {
      observer.error({
        error: { name, errorMessage: this.filesErrorMessages.invalidSize },
      });
    }
  }

  private isValidSize(size: number): boolean {
    const toKByte = size / 1024;
    return toKByte <= 1000;
  }

  removeAttachment(file: UploadedFile) {
    const fileIndex = this.handleFormService.uploadedFiles.indexOf(file);
    this.handleFormService.uploadedFiles.splice(fileIndex, 1);
  }

  ngOnDestroy() {
    if (this.fileSubscription) {
      this.fileSubscription.unsubscribe();
    }
  }
}
