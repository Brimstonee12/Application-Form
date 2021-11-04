export interface UploadedFile {
  file?: File;
  error?: UploadError;
}

export interface UploadError {
  name: string;
  errorMessage: string;
}

export interface FilesErrorMessages {
  invalidType: string;
  invalidSize: string;
  invalidFile: string;
  invalidFilesLimit: string;
  invalidSystem: string;
}
