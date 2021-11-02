import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HandleFormService } from '../../services/handle-form.service';
import { Observable, Observer, from, of, Subscription } from 'rxjs';
import { UploadedFile, UploadError } from '../../types/files';
import { concatMap, catchError, take } from 'rxjs/operators';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit {
  fileSubscription: Subscription;

  constructor(public handleFormService: HandleFormService) {}

  public fileBrowseHandler(fileData) {
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
        if (this.handleFormService.uploadedFiles.length <= 1) {
          this.handleFormService.uploadedFiles.push(validatedFile);
        } else {
          //BLAD NA STRONIE MA WYSKOCZYC
          console.log('ZA DUZO PLIKOW');
        }
      });
  }

//BLAD Z WYSLANIEM PONOWNIE TEGO SAMEGO PLIKU
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
          observer.error({ error: { name, errorMessage: 'INVALID_TYPE' } });
        }
      };
      fileReader.onerror = () => {
        const { name } = file;
        observer.error({ error: { name, errorMessage: 'INVALID_FILE' } });
      };
    });
  }

  private isCorrectType(fileType: string): boolean {
    return fileType.match(/pdf\/*/) !== null;
  }

  private validateSize(file: File, observer: Observer<UploadedFile>): void {
    const { name, size } = file;
    if (!this.isValidSize(size)) {
      observer.error({ error: { name, errorMessage: 'INVALID_SIZE' } });
    }
  }

  private isValidSize(size: number): boolean {
    const toKByte = size / 1024;
    return toKByte <= 1000;
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.fileSubscription.unsubscribe();
  }
}
