
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { FileIcon, FolderIcon, FileImageIcon, FileTextIcon, FileAudioIcon, FileVideoIcon } from "lucide-react";
import { mockFiles } from "@/lib/mock-data";
import { formatDistanceToNow } from "date-fns";
import { formatFileSize } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const RecentFiles = () => {
  const [files, setFiles] = useState(mockFiles.slice(0, 5));

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <FileImageIcon className="h-4 w-4" />;
      case "document":
        return <FileTextIcon className="h-4 w-4" />;
      case "audio":
        return <FileAudioIcon className="h-4 w-4" />;
      case "video":
        return <FileVideoIcon className="h-4 w-4" />;
      case "folder":
        return <FolderIcon className="h-4 w-4" />;
      default:
        return <FileIcon className="h-4 w-4" />;
    }
  };

  const handleDownload = (id: string, name: string) => {
    toast.success(`Downloading ${name}...`);
    // Implement actual download
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Files</CardTitle>
        <CardDescription>Your recently accessed files and folders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-md ${
                  file.type === "folder" ? "bg-blue-100 text-blue-700" : 
                  file.type === "image" ? "bg-green-100 text-green-700" :
                  file.type === "document" ? "bg-yellow-100 text-yellow-700" :
                  file.type === "video" ? "bg-purple-100 text-purple-700" :
                  "bg-gray-100 text-gray-700"
                } dark:bg-opacity-20`}>
                  {getFileIcon(file.type)}
                </div>
                <div>
                  <div className="font-medium">{file.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {file.type !== "folder" && formatFileSize(file.size)} • {formatDistanceToNow(new Date(file.modifiedAt), { addSuffix: true })}
                  </div>
                </div>
              </div>
              {file.type !== "folder" && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDownload(file.id, file.name)}
                >
                  Download
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentFiles;
