export interface UploadedFile {
  file?: File;
  error?: UploadError;
}

export interface UploadError {
  name: string;
  errorMessage: string;
}
