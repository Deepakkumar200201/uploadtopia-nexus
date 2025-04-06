
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentFiles from "@/components/dashboard/RecentFiles";
import StorageOverview from "@/components/dashboard/StorageOverview";
import UploadButton from "@/components/dashboard/UploadButton";
import FileGrid from "@/components/dashboard/FileGrid";
import { Button } from "@/components/ui/button";
import { GridIcon, ListIcon, FolderPlusIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { File } from "@/lib/types";

const Dashboard = () => {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [recentFiles, setRecentFiles] = useState<File[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem("terabox_user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    // Load files from localStorage
    const loadFiles = () => {
      const storedFiles = localStorage.getItem('terabox_files');
      if (storedFiles) {
        const parsedFiles = JSON.parse(storedFiles) as File[];
        // Only show files that aren't in the recycle bin
        const activeFiles = parsedFiles.filter(file => !file.recycled);
        setFiles(activeFiles);
        setRecentFiles(activeFiles.slice(0, 5));
      }
    };
    
    loadFiles();
    
    // Listen for file updates
    const handleFileUpdate = () => loadFiles();
    window.addEventListener('filesupdated', handleFileUpdate);
    
    return () => {
      window.removeEventListener('filesupdated', handleFileUpdate);
    };
  }, []);

  const handleCreateFolder = () => {
    toast.info("Create folder functionality coming soon");
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name || "User"}!</h1>
          <p className="text-muted-foreground">
            Manage your files and folders all in one place
          </p>
        </div>
        <div className="flex space-x-2">
          <UploadButton />
          <Button variant="outline" onClick={handleCreateFolder}>
            <FolderPlusIcon className="mr-2 h-4 w-4" />
            New Folder
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>
              Your recently accessed and important files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentFiles />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Storage</CardTitle>
            <CardDescription>
              Your cloud storage usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StorageOverview />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Files</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          <div className="flex space-x-1">
            <Button
              variant={viewType === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewType("grid")}
              className="h-9 w-9"
            >
              <GridIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={viewType === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewType("list")}
              className="h-9 w-9"
            >
              <ListIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <TabsContent value="all" className="pt-4">
          <FileGrid type={viewType} files={files} />
        </TabsContent>
        <TabsContent value="recent" className="pt-4">
          <FileGrid type={viewType} files={recentFiles} />
        </TabsContent>
        <TabsContent value="images" className="pt-4">
          <FileGrid 
            type={viewType} 
            files={files.filter(file => file.type === "image")}
          />
        </TabsContent>
        <TabsContent value="documents" className="pt-4">
          <FileGrid 
            type={viewType} 
            files={files.filter(file => file.type === "document")}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
