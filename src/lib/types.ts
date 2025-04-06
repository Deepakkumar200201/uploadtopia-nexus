
export interface File {
  id: string;
  name: string;
  type: "folder" | "image" | "document" | "video" | "audio" | "other";
  size: number;
  createdAt: string;
  modifiedAt: string;
  path: string;
  starred?: boolean;
  previewUrl?: string;
  shared?: boolean;
  recycled?: boolean;
}

export interface User {
  name: string;
  email: string;
  storage: {
    used: number; // GB
    total: number; // GB
  };
}
