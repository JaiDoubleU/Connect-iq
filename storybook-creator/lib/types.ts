export interface StorylineField {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'textarea' | 'select';
  options?: string[];
}

export interface Storyline {
  id: string;
  title: string;
  description: string;
  fields: StorylineField[];
  generatePages: (values: Record<string, string>) => string[];
}

export interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  lineDrawing?: string;
}

export interface BookState {
  title: string;
  storylineId: string;
  storylineValues: Record<string, string>;
  images: UploadedImage[];
  pages: PageData[];
}

export interface PageData {
  imageUrl: string;
  text: string;
}
