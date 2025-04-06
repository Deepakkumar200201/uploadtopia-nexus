
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FileGrid from "@/components/dashboard/FileGrid";
import UploadButton from "@/components/dashboard/UploadButton";
import { GridIcon, ListIcon, FolderPlusIcon, ChevronDownIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { mockFiles } from "@/lib/mock-data";
import { toast } from "sonner";

const MyFiles = () => {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const handleCreateFolder = () => {
    toast.info("Create folder functionality coming soon");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(`Searching for "${searchQuery}"...`);
    // Implement search functionality
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Files</h1>
          <Breadcrumb className="text-sm text-muted-foreground">
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/my-files">My Files</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="flex space-x-2">
          <UploadButton />
          <Button variant="outline" onClick={handleCreateFolder}>
            <FolderPlusIcon className="mr-2 h-4 w-4" />
            New Folder
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Tabs defaultValue="all" className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="docs">Documents</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center space-x-2 w-full md:w-auto">
          <form onSubmit={handleSearch} className="flex-1 md:w-auto">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search files..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          
          <Button variant="outline" className="hidden md:flex">
            <span>Sort by: Name</span>
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
          
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
      </div>

      <FileGrid type={viewType} files={mockFiles} />
    </div>
  );
};

export default MyFiles;
