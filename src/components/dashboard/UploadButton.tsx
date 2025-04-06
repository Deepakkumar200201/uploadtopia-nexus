import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { UploadIcon, XIcon, CheckIcon, FileIcon } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { File } from "@/lib/types";

const UploadButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUpload = () => {
    if (!files || files.length === 0) {
      toast.error("Please select files to upload");
      return;
    }

    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          
          const uploadedFiles: File[] = [];
          
          Array.from(files).forEach(file => {
            const previewUrl = URL.createObjectURL(file);
            
            let fileType: "image" | "document" | "video" | "audio" | "other" = "other";
            if (file.type.startsWith("image/")) fileType = "image";
            else if (file.type.startsWith("video/")) fileType = "video";
            else if (file.type.startsWith("audio/")) fileType = "audio";
            else if (file.type.includes("pdf") || file.type.includes("document") || 
                    file.type.includes("text/") || file.name.endsWith(".doc") || 
                    file.name.endsWith(".docx") || file.name.endsWith(".txt")) {
              fileType = "document";
            }
            
            const newFile: File = {
              id: uuidv4(),
              name: file.name,
              type: fileType,
              size: file.size,
              createdAt: new Date().toISOString(),
              modifiedAt: new Date().toISOString(),
              path: `/files/${file.name}`,
              previewUrl
            };
            
            uploadedFiles.push(newFile);
          });
          
          const existingFiles = localStorage.getItem('terabox_files');
          const fileArray = existingFiles ? JSON.parse(existingFiles) : [];
          const updatedFiles = [...fileArray, ...uploadedFiles];
          localStorage.setItem('terabox_files', JSON.stringify(updatedFiles));
          
          const userData = localStorage.getItem("terabox_user");
          if (userData) {
            const user = JSON.parse(userData);
            const totalFileSize = Array.from(files).reduce((acc, file) => acc + file.size, 0) / (1024 * 1024 * 1024);
            user.storage.used = Math.min(user.storage.total, user.storage.used + totalFileSize);
            localStorage.setItem("terabox_user", JSON.stringify(user));
          }
          
          toast.success(`Successfully uploaded ${files.length} files`);
          setFiles(null);
          setIsDialogOpen(false);
          
          window.dispatchEvent(new CustomEvent('filesupdated'));
          
          return 0;
        }
        return prev + 5;
      });
    }, 150);
  };

  const removeFile = (index: number) => {
    if (files) {
      const dt = new DataTransfer();
      Array.from(files).forEach((file, i) => {
        if (i !== index) dt.items.add(file);
      });
      setFiles(dt.files);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <>
      <Button 
        onClick={() => setIsDialogOpen(true)}
        className="relative overflow-hidden"
      >
        <UploadIcon className="mr-2 h-4 w-4" />
        Upload Files
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
            <DialogDescription>
              Drag and drop files here or click to browse
            </DialogDescription>
          </DialogHeader>

          <div
            className={`mt-4 border-2 border-dashed rounded-lg p-8 text-center ${
              files && files.length > 0 ? "border-primary/70" : "border-muted-foreground/30"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {!files || files.length === 0 ? (
              <div className="flex flex-col items-center">
                <UploadIcon className="h-12 w-12 text-muted-foreground/70 mb-4" />
                <p className="text-muted-foreground mb-2">Drag files here or click to browse</p>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("file-upload-dialog")?.click()}
                >
                  Select Files
                </Button>
                <input
                  id="file-upload-dialog"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {Array.from(files).map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-muted/50 rounded-md p-2"
                    >
                      <div className="flex items-center space-x-2 overflow-hidden">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                          <FileIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-full"
                        onClick={() => removeFile(index)}
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {uploading ? (
                  <div className="space-y-2">
                    <Progress value={progress} />
                    <div className="flex justify-between text-xs">
                      <span>Uploading: {progress}%</span>
                      <span>{files.length} files</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setFiles(null)}>
                      Clear All
                    </Button>
                    <Button onClick={handleUpload}>
                      {progress === 100 ? (
                        <>
                          <CheckIcon className="mr-2 h-4 w-4" /> Uploaded
                        </>
                      ) : (
                        <>
                          <UploadIcon className="mr-2 h-4 w-4" /> Upload {files.length} Files
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadButton;
