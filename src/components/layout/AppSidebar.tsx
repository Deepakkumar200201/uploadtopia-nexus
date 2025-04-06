import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HomeIcon,
  FolderIcon,
  SettingsIcon,
  TrashIcon,
  MenuIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <HomeIcon className="h-4 w-4" />,
  },
  {
    title: "My Files",
    href: "/dashboard/my-files",
    icon: <FolderIcon className="h-4 w-4" />,
  },
  {
    title: "Recycle Bin",
    href: "/dashboard/recycle-bin",
    icon: <TrashIcon className="h-4 w-4" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <SettingsIcon className="h-4 w-4" />,
  },
];

const AppSidebar = () => {
  return (
    <div className="hidden md:flex flex-col w-60 border-r h-screen py-4">
      <Link to="/" className="px-6 mb-10">
        <h1 className="text-2xl font-bold tracking-tight">TeraBox</h1>
      </Link>
      <Separator />
      <div className="flex flex-col flex-grow p-2 space-y-1">
        {sidebarItems.map((item) => (
          <TooltipProvider key={item.title}>
            <Tooltip delayDuration={50}>
              <TooltipTrigger asChild>
                <Link
                  to={item.href}
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" align="center">
                {item.title}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      <Separator />
      <div className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center w-full">
              <Avatar className="mr-2 h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <span className="text-sm">shadcn</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default AppSidebar;
