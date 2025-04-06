
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FolderIcon, HomeIcon, ImageIcon, FileIcon, TrashIcon, ShareIcon, UploadIcon, Settings2Icon, LogOutIcon } from "lucide-react";
import { useState, useEffect } from "react";

const AppSidebar = () => {
  const navigate = useNavigate();
  const [storageInfo, setStorageInfo] = useState({ used: 0, total: 15 }); // Default values

  useEffect(() => {
    const userData = localStorage.getItem("terabox_user");
    if (userData) {
      const { storage } = JSON.parse(userData);
      setStorageInfo(storage);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("terabox_token");
    localStorage.removeItem("terabox_user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const storagePercentage = (storageInfo.used / storageInfo.total) * 100;

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-terabox-600 flex items-center justify-center text-white font-bold">
            T
          </div>
          <h1 className="text-xl font-bold">TeraBox</h1>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/dashboard")}>
                    <HomeIcon className="mr-2 h-4 w-4" />
                    <span>Home</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/dashboard/my-files")}>
                    <FileIcon className="mr-2 h-4 w-4" />
                    <span>My Files</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/dashboard/photos")}>
                    <ImageIcon className="mr-2 h-4 w-4" />
                    <span>Photos</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/dashboard/folders")}>
                    <FolderIcon className="mr-2 h-4 w-4" />
                    <span>Folders</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/dashboard/shared")}>
                    <ShareIcon className="mr-2 h-4 w-4" />
                    <span>Shared</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/dashboard/trash")}>
                    <TrashIcon className="mr-2 h-4 w-4" />
                    <span>Trash</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel>Upload</SidebarGroupLabel>
          <SidebarGroupContent>
            <Button className="w-full" onClick={() => document.getElementById("file-upload")?.click()}>
              <UploadIcon className="mr-2 h-4 w-4" />
              Upload Files
            </Button>
            <input id="file-upload" type="file" multiple className="hidden" />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel>Storage</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2 p-2">
              <Progress value={storagePercentage} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {storageInfo.used.toFixed(1)} GB / {storageInfo.total} GB used
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto">
        <div className="p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/dashboard/settings")}>
            <Settings2Icon className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
