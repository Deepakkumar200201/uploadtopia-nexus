
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { FileIcon, FolderIcon, FileImageIcon, FileTextIcon, FileAudioIcon, FileVideoIcon, MoreVerticalIcon, DownloadIcon, ShareIcon, PencilIcon, TrashIcon, EyeIcon, RefreshCwIcon, XIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { formatFileSize } from "@/lib/utils";
import { mockFiles } from "@/lib/mock-data";
import { File } from "@/lib/types";

interface FileGridProps {
  files?: File[];
  type?: "grid" | "list";
  isRecycleBin?: boolean;
}

const FileGrid = ({ files = mockFiles, type = "grid", isRecycleBin = false }: FileGridProps) => {
  const [viewFile, setViewFile] = useState<File | null>(null);
  const [confirmDeleteFile, setConfirmDeleteFile] = useState<File | null>(null);
  const [localFiles, setLocalFiles] = useState<File[]>(files);

  useEffect(() => {
    setLocalFiles(files);
  }, [files]);

  const getFileIcon = (fileType: string, size = 4) => {
    const iconSize = `h-${size} w-${size}`;
    
    switch (fileType) {
      case "image":
        return <FileImageIcon className={iconSize} />;
      case "document":
        return <FileTextIcon className={iconSize} />;
      case "audio":
        return <FileAudioIcon className={iconSize} />;
      case "video":
        return <FileVideoIcon className={iconSize} />;
      case "folder":
        return <FolderIcon className={iconSize} />;
      default:
        return <FileIcon className={iconSize} />;
    }
  };

  const handleFileAction = (action: string, file: File) => {
    switch (action) {
      case "preview":
        setViewFile(file);
        break;
      case "download":
        if (file.previewUrl) {
          // Create an anchor element and trigger download
          const a = document.createElement('a');
          a.href = file.previewUrl;
          a.download = file.name;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          toast.success(`Downloading ${file.name}`);
        } else {
          toast.error(`No file content available to download`);
        }
        break;
      case "rename":
        toast.info(`Rename functionality coming soon`);
        break;
      case "share":
        toast.info(`Share functionality coming soon`);
        break;
      case "delete":
        if (isRecycleBin) {
          // Permanent delete
          setConfirmDeleteFile(file);
        } else {
          // Move to recycle bin
          moveToRecycleBin(file);
        }
        break;
      case "restore":
        restoreFromRecycleBin(file);
        break;
      default:
        break;
    }
  };

  const moveToRecycleBin = (file: File) => {
    // Get existing files
    const storedFiles = localStorage.getItem('terabox_files');
    if (storedFiles) {
      const allFiles = JSON.parse(storedFiles) as File[];
      
      // Find file and mark as recycled
      const updatedFiles = allFiles.map(f => {
        if (f.id === file.id) {
          return { ...f, recycled: true };
        }
        return f;
      });
      
      // Update localStorage
      localStorage.setItem('terabox_files', JSON.stringify(updatedFiles));
      
      // Update local state
      setLocalFiles(prevFiles => prevFiles.filter(f => f.id !== file.id));
      
      toast.success(`${file.name} moved to recycle bin`);
      
      // Trigger event to refresh other components
      window.dispatchEvent(new CustomEvent('filesupdated'));
    }
  };

  const restoreFromRecycleBin = (file: File) => {
    // Get existing files
    const storedFiles = localStorage.getItem('terabox_files');
    if (storedFiles) {
      const allFiles = JSON.parse(storedFiles) as File[];
      
      // Find file and mark as not recycled
      const updatedFiles = allFiles.map(f => {
        if (f.id === file.id) {
          return { ...f, recycled: false };
        }
        return f;
      });
      
      // Update localStorage
      localStorage.setItem('terabox_files', JSON.stringify(updatedFiles));
      
      // Update local state
      setLocalFiles(prevFiles => prevFiles.filter(f => f.id !== file.id));
      
      toast.success(`${file.name} restored from recycle bin`);
      
      // Trigger event to refresh other components
      window.dispatchEvent(new CustomEvent('filesupdated'));
    }
  };

  const permanentlyDeleteFile = () => {
    if (!confirmDeleteFile) return;
    
    // Get existing files
    const storedFiles = localStorage.getItem('terabox_files');
    if (storedFiles) {
      const allFiles = JSON.parse(storedFiles) as File[];
      
      // Remove file completely
      const updatedFiles = allFiles.filter(f => f.id !== confirmDeleteFile.id);
      
      // Update localStorage
      localStorage.setItem('terabox_files', JSON.stringify(updatedFiles));
      
      // Update local state
      setLocalFiles(prevFiles => prevFiles.filter(f => f.id !== confirmDeleteFile.id));
      
      toast.success(`${confirmDeleteFile.name} permanently deleted`);
      
      // Trigger event to refresh other components
      window.dispatchEvent(new CustomEvent('filesupdated'));
      
      // Close dialog
      setConfirmDeleteFile(null);
    }
  };

  const renderFilePreview = (file: File) => {
    if (file.type === "image" && file.previewUrl) {
      return (
        <img
          src={file.previewUrl}
          alt={file.name}
          className="w-full h-full object-cover rounded-lg"
        />
      );
    } else if (file.type === "video" && file.previewUrl) {
      return (
        <video
          src={file.previewUrl}
          controls
          className="w-full h-full object-contain rounded-lg"
        />
      );
    } else if (file.type === "audio" && file.previewUrl) {
      return (
        <div className="flex flex-col items-center justify-center p-4">
          <FileAudioIcon className="h-24 w-24 text-primary mb-4" />
          <audio src={file.previewUrl} controls className="w-full" />
        </div>
      );
    } else if (file.type === "document" && file.previewUrl) {
      return (
        <iframe
          src={file.previewUrl}
          className="w-full h-[70vh]"
          title={file.name}
        />
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center p-8">
          <div className="p-6 rounded-full bg-primary/10 mb-4">
            {getFileIcon(file.type, 12)}
          </div>
          <p className="text-lg font-medium">{file.name}</p>
          <p className="text-sm text-muted-foreground">
            {file.type !== "folder" && formatFileSize(file.size)}
          </p>
          <Button 
            className="mt-4" 
            onClick={() => handleFileAction("download", file)}
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      );
    }
  };

  if (type === "grid") {
    return (
      <>
        <div className="file-grid">
          {localFiles.map((file) => (
            <Card key={file.id} className="overflow-hidden group">
              <div 
                className="aspect-square relative cursor-pointer"
                onClick={() => handleFileAction("preview", file)}
              >
                {file.type === "image" && file.previewUrl ? (
                  <img 
                    src={file.previewUrl} 
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${
                    file.type === "folder" ? "bg-blue-50 text-blue-700" : 
                    file.type === "image" ? "bg-green-50 text-green-700" :
                    file.type === "document" ? "bg-yellow-50 text-yellow-700" :
                    file.type === "video" ? "bg-purple-50 text-purple-700" :
                    "bg-gray-50 text-gray-700"
                  } dark:bg-opacity-10`}>
                    {getFileIcon(file.type, 8)}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="mr-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFileAction("preview", file);
                    }}
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                  {!isRecycleBin && (
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFileAction("download", file);
                      }}
                    >
                      <DownloadIcon className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="truncate pr-2">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {file.type !== "folder" ? formatFileSize(file.size) : "Folder"} • {formatDistanceToNow(new Date(file.modifiedAt), { addSuffix: true })}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVerticalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleFileAction("preview", file)}>
                        <EyeIcon className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      {!isRecycleBin && (
                        <>
                          {file.type !== "folder" && (
                            <DropdownMenuItem onClick={() => handleFileAction("download", file)}>
                              <DownloadIcon className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleFileAction("share", file)}>
                            <ShareIcon className="mr-2 h-4 w-4" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleFileAction("rename", file)}>
                            <PencilIcon className="mr-2 h-4 w-4" />
                            Rename
                          </DropdownMenuItem>
                        </>
                      )}
                      {isRecycleBin && (
                        <DropdownMenuItem onClick={() => handleFileAction("restore", file)}>
                          <RefreshCwIcon className="mr-2 h-4 w-4" />
                          Restore
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleFileAction("delete", file)}
                      >
                        <TrashIcon className="mr-2 h-4 w-4" />
                        {isRecycleBin ? "Delete permanently" : "Move to trash"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {viewFile && (
          <Dialog open={!!viewFile} onOpenChange={() => setViewFile(null)}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{viewFile.name}</DialogTitle>
              </DialogHeader>
              {renderFilePreview(viewFile)}
            </DialogContent>
          </Dialog>
        )}

        {confirmDeleteFile && (
          <AlertDialog open={!!confirmDeleteFile} onOpenChange={() => setConfirmDeleteFile(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Permanently delete file?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete {confirmDeleteFile.name}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={permanentlyDeleteFile}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete permanently
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </>
    );
  }

  // List view with same recyclebin functionality
  return (
    <>
      <div className="file-list border rounded-lg divide-y">
        {localFiles.map((file) => (
          <div 
            key={file.id} 
            className="file-list-item group cursor-pointer"
            onClick={() => handleFileAction("preview", file)}
          >
            <div className="flex items-center w-full">
              <div className={`p-2 rounded-md mr-3 ${
                file.type === "folder" ? "bg-blue-100 text-blue-700" : 
                file.type === "image" ? "bg-green-100 text-green-700" :
                file.type === "document" ? "bg-yellow-100 text-yellow-700" :
                file.type === "video" ? "bg-purple-100 text-purple-700" :
                "bg-gray-100 text-gray-700"
              } dark:bg-opacity-20`}>
                {getFileIcon(file.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {file.type !== "folder" ? formatFileSize(file.size) : "Folder"} • {formatDistanceToNow(new Date(file.modifiedAt), { addSuffix: true })}
                </p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-muted-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFileAction("preview", file);
                  }}
                >
                  <EyeIcon className="h-4 w-4" />
                </Button>
                {!isRecycleBin && file.type !== "folder" && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFileAction("download", file);
                    }}
                  >
                    <DownloadIcon className="h-4 w-4" />
                  </Button>
                )}
                {isRecycleBin && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFileAction("restore", file);
                    }}
                  >
                    <RefreshCwIcon className="h-4 w-4" />
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVerticalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleFileAction("preview", file)}>
                      <EyeIcon className="mr-2 h-4 w-4" />
                      Preview
                    </DropdownMenuItem>
                    {!isRecycleBin && (
                      <>
                        {file.type !== "folder" && (
                          <DropdownMenuItem onClick={() => handleFileAction("download", file)}>
                            <DownloadIcon className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleFileAction("share", file)}>
                          <ShareIcon className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFileAction("rename", file)}>
                          <PencilIcon className="mr-2 h-4 w-4" />
                          Rename
                        </DropdownMenuItem>
                      </>
                    )}
                    {isRecycleBin && (
                      <DropdownMenuItem onClick={() => handleFileAction("restore", file)}>
                        <RefreshCwIcon className="mr-2 h-4 w-4" />
                        Restore
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleFileAction("delete", file)}
                    >
                      <TrashIcon className="mr-2 h-4 w-4" />
                      {isRecycleBin ? "Delete permanently" : "Move to trash"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>

      {viewFile && (
        <Dialog open={!!viewFile} onOpenChange={() => setViewFile(null)}>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{viewFile.name}</DialogTitle>
            </DialogHeader>
            {renderFilePreview(viewFile)}
          </DialogContent>
        </Dialog>
      )}

      {confirmDeleteFile && (
        <AlertDialog open={!!confirmDeleteFile} onOpenChange={() => setConfirmDeleteFile(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Permanently delete file?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete {confirmDeleteFile.name}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={permanentlyDeleteFile}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete permanently
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default FileGrid;
