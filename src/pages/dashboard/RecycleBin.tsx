
import { useState, useEffect } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import FileGrid from "@/components/dashboard/FileGrid";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { TrashIcon, RefreshCwIcon } from "lucide-react";
import { toast } from "sonner";
import { File } from "@/lib/types";

const RecycleBin = () => {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [recycleBinFiles, setRecycleBinFiles] = useState<File[]>([]);
  const [isEmptyBinDialogOpen, setIsEmptyBinDialogOpen] = useState(false);

  useEffect(() => {
    loadRecycleBinFiles();
    
    // Listen for file updates
    const handleFileUpdate = () => loadRecycleBinFiles();
    window.addEventListener('filesupdated', handleFileUpdate);
    
    return () => {
      window.removeEventListener('filesupdated', handleFileUpdate);
    };
  }, []);

  const loadRecycleBinFiles = () => {
    const storedFiles = localStorage.getItem('terabox_files');
    if (storedFiles) {
      const allFiles = JSON.parse(storedFiles) as File[];
      const recycledFiles = allFiles.filter(file => file.recycled);
      setRecycleBinFiles(recycledFiles);
    }
  };

  const handleRestoreAll = () => {
    const storedFiles = localStorage.getItem('terabox_files');
    if (storedFiles) {
      const allFiles = JSON.parse(storedFiles) as File[];
      
      // Remove recycled flag from all files
      const updatedFiles = allFiles.map(f => {
        if (f.recycled) {
          return { ...f, recycled: false };
        }
        return f;
      });
      
      // Update localStorage
      localStorage.setItem('terabox_files', JSON.stringify(updatedFiles));
      
      toast.success(`All files restored from recycle bin`);
      
      // Trigger event to refresh other components
      window.dispatchEvent(new CustomEvent('filesupdated'));
    }
  };

  const handleEmptyRecycleBin = () => {
    const storedFiles = localStorage.getItem('terabox_files');
    if (storedFiles) {
      const allFiles = JSON.parse(storedFiles) as File[];
      
      // Remove all files that are in recycle bin
      const updatedFiles = allFiles.filter(f => !f.recycled);
      
      // Update localStorage
      localStorage.setItem('terabox_files', JSON.stringify(updatedFiles));
      
      setIsEmptyBinDialogOpen(false);
      toast.success(`Recycle bin emptied`);
      
      // Trigger event to refresh other components
      window.dispatchEvent(new CustomEvent('filesupdated'));
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recycle Bin</h1>
          <Breadcrumb className="text-sm text-muted-foreground">
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/recycle-bin">Recycle Bin</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="flex space-x-2">
          {recycleBinFiles.length > 0 && (
            <>
              <Button variant="outline" onClick={handleRestoreAll}>
                <RefreshCwIcon className="mr-2 h-4 w-4" />
                Restore All
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => setIsEmptyBinDialogOpen(true)}
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                Empty Recycle Bin
              </Button>
            </>
          )}
        </div>
      </div>

      {recycleBinFiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted rounded-full p-4 mb-4">
            <TrashIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">Recycle Bin is Empty</h3>
          <p className="text-muted-foreground mt-1">Files you delete will appear here</p>
        </div>
      ) : (
        <FileGrid 
          type={viewType} 
          files={recycleBinFiles} 
          isRecycleBin={true}
        />
      )}

      <AlertDialog open={isEmptyBinDialogOpen} onOpenChange={setIsEmptyBinDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Empty Recycle Bin?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all items in the Recycle Bin.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleEmptyRecycleBin}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Empty Recycle Bin
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RecycleBin;
