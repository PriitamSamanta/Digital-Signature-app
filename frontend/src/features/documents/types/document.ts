export interface Document {
  _id: string;
  title: string;
  originalFileName: string;
  filePath: string;
  fileSize: number;
  status: string;

  createdAt: string;
  updatedAt: string;
}