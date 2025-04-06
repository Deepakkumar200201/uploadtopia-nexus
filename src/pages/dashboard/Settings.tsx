
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useTheme } from "@/hooks/use-theme";
import { useState, useEffect } from "react";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    notifications: true,
    autoSave: true,
    darkMode: theme === "dark",
  });

  useEffect(() => {
    const userData = localStorage.getItem("terabox_user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setForm(prev => ({
        ...prev,
        name: parsedUser.name,
        email: parsedUser.email,
      }));
    }
  }, []);

  const handleSaveProfile = () => {
    if (user) {
      const updatedUser = {
        ...user,
        name: form.name,
        email: form.email,
      };
      localStorage.setItem("terabox_user", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully");
    }
  };

  const handleDarkModeToggle = (checked: boolean) => {
    setForm(prev => ({ ...prev, darkMode: checked }));
    setTheme(checked ? "dark" : "light");
    toast.success(`${checked ? "Dark" : "Light"} mode enabled`);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveProfile}>Save Changes</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your TeraBox experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email notifications about your files
                </p>
              </div>
              <Switch
                checked={form.notifications}
                onCheckedChange={(checked) => {
                  setForm(prev => ({ ...prev, notifications: checked }));
                  toast.success(`Notifications ${checked ? "enabled" : "disabled"}`);
                }}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-Save</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically save edited files
                </p>
              </div>
              <Switch
                checked={form.autoSave}
                onCheckedChange={(checked) => {
                  setForm(prev => ({ ...prev, autoSave: checked }));
                  toast.success(`Auto-save ${checked ? "enabled" : "disabled"}`);
                }}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enable dark theme for TeraBox
                </p>
              </div>
              <Switch
                checked={form.darkMode}
                onCheckedChange={handleDarkModeToggle}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => toast.info("Password change functionality coming soon")}>
              Change Password
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Storage Plan</CardTitle>
            <CardDescription>Manage your storage plan and usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-secondary p-4 rounded-lg">
              <div className="font-semibold mb-1">Current Plan: Free</div>
              <div className="text-sm text-muted-foreground mb-3">15 GB of storage</div>
              <div className="text-xs text-primary">
                Upgrade for more storage and features
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground space-y-1">
              <div className="flex justify-between">
                <span>Total Storage</span>
                <span className="font-medium">15 GB</span>
              </div>
              <div className="flex justify-between">
                <span>Used Storage</span>
                <span className="font-medium">1.7 GB</span>
              </div>
              <div className="flex justify-between">
                <span>Available Storage</span>
                <span className="font-medium">13.3 GB</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => toast.info("Upgrade plan functionality coming soon")}>
              Upgrade Plan
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
