
import { File } from "./types";

// Placeholder image URLs
const placeholderImages = [
  "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1418489098061-ce87b5dc3aee?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=500&auto=format&fit=crop&q=60",
];

export const mockFiles: File[] = [
  {
    id: "file-1",
    name: "Project Documentation.pdf",
    type: "document",
    size: 2500000, // 2.5 MB
    createdAt: "2023-03-15T10:30:00Z",
    modifiedAt: "2023-03-20T14:20:00Z",
    path: "/documents",
    previewUrl: "https://www.africau.edu/images/default/sample.pdf"
  },
  {
    id: "file-2",
    name: "Vacation Photos",
    type: "folder",
    size: 0,
    createdAt: "2023-02-10T08:15:00Z",
    modifiedAt: "2023-03-25T11:45:00Z",
    path: "/",
  },
  {
    id: "file-3",
    name: "Quarterly Report Q1.xlsx",
    type: "document",
    size: 1800000, // 1.8 MB
    createdAt: "2023-03-28T09:00:00Z",
    modifiedAt: "2023-03-28T09:00:00Z",
    path: "/documents/reports",
  },
  {
    id: "file-4",
    name: "Beach Sunset.jpg",
    type: "image",
    size: 4500000, // 4.5 MB
    createdAt: "2023-01-05T16:20:00Z",
    modifiedAt: "2023-01-05T16:20:00Z",
    path: "/images",
    previewUrl: placeholderImages[0],
  },
  {
    id: "file-5",
    name: "Project Presentation.pptx",
    type: "document",
    size: 5200000, // 5.2 MB
    createdAt: "2023-03-10T13:40:00Z",
    modifiedAt: "2023-03-18T10:15:00Z",
    path: "/documents/presentations",
  },
  {
    id: "file-6",
    name: "Mountain View.jpg",
    type: "image",
    size: 3800000, // 3.8 MB
    createdAt: "2023-02-20T14:30:00Z",
    modifiedAt: "2023-02-20T14:30:00Z",
    path: "/images",
    previewUrl: placeholderImages[1],
  },
  {
    id: "file-7",
    name: "Project Code Backup",
    type: "folder",
    size: 0,
    createdAt: "2023-03-01T09:20:00Z",
    modifiedAt: "2023-03-27T16:10:00Z",
    path: "/",
  },
  {
    id: "file-8",
    name: "Annual Budget.xlsx",
    type: "document",
    size: 1200000, // 1.2 MB
    createdAt: "2023-01-15T11:25:00Z",
    modifiedAt: "2023-03-15T14:50:00Z",
    path: "/documents/financial",
  },
  {
    id: "file-9",
    name: "Company Meeting.mp4",
    type: "video",
    size: 158000000, // 158 MB
    createdAt: "2023-03-22T15:00:00Z",
    modifiedAt: "2023-03-22T15:00:00Z",
    path: "/videos",
    previewUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
  },
  {
    id: "file-10",
    name: "Client Feedback.docx",
    type: "document",
    size: 850000, // 850 KB
    createdAt: "2023-03-25T10:40:00Z",
    modifiedAt: "2023-03-26T09:15:00Z",
    path: "/documents/clients",
  },
  {
    id: "file-11",
    name: "Product Photos",
    type: "folder",
    size: 0,
    createdAt: "2023-02-05T13:10:00Z",
    modifiedAt: "2023-03-20T11:30:00Z",
    path: "/images",
  },
  {
    id: "file-12",
    name: "Forest Landscape.jpg",
    type: "image",
    size: 5100000, // 5.1 MB
    createdAt: "2023-01-30T14:20:00Z",
    modifiedAt: "2023-01-30T14:20:00Z",
    path: "/images",
    previewUrl: placeholderImages[2],
  },
  {
    id: "file-13",
    name: "Summer Mix.mp3",
    type: "audio",
    size: 8500000, // 8.5 MB
    createdAt: "2023-03-15T12:30:00Z",
    modifiedAt: "2023-03-15T12:30:00Z",
    path: "/audio",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "file-14",
    name: "Marketing Strategy.pdf",
    type: "document",
    size: 3200000, // 3.2 MB
    createdAt: "2023-03-10T09:45:00Z",
    modifiedAt: "2023-03-20T15:30:00Z",
    path: "/documents/marketing",
    previewUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "file-15",
    name: "Cityscape.jpg",
    type: "image",
    size: 4200000, // 4.2 MB
    createdAt: "2023-02-25T16:40:00Z",
    modifiedAt: "2023-02-25T16:40:00Z",
    path: "/images",
    previewUrl: placeholderImages[3],
  },
];
