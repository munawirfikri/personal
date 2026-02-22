export interface InputGroupProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  onSave?: (value: string) => void;
  type?: 'text' | 'password' | 'email' | 'url';
  as?: 'input' | 'textarea';
  autoSave?: boolean;
  required?: boolean;
}

export interface TagsInputProps {
  label: string;
  value: string[];
  onSave: (tags: string[]) => void;
}

export interface ImagePreviewProps {
  url: string;
}

export type SaveMode = 'auto' | 'manual';
export type TabType = 'profile' | 'experience' | 'education' | 'projects';
