
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useState, useEffect } from "react";

const StorageOverview = () => {
  const [storageInfo, setStorageInfo] = useState({
    used: 1.7,
    total: 15,
    breakdown: [
      { name: "Documents", value: 0.5, color: "#1E88E5" },
      { name: "Images", value: 0.8, color: "#4CAF50" },
      { name: "Videos", value: 0.3, color: "#9C27B0" },
      { name: "Other", value: 0.1, color: "#FF9800" },
    ],
  });

  useEffect(() => {
    const userData = localStorage.getItem("terabox_user");
    if (userData) {
      const { storage } = JSON.parse(userData);
      if (storage) {
        setStorageInfo(prev => ({
          ...prev,
          used: storage.used,
          total: storage.total
        }));
      }
    }
  }, []);

  const storagePercentage = (storageInfo.used / storageInfo.total) * 100;
  const remainingStorage = storageInfo.total - storageInfo.used;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Storage Overview</CardTitle>
        <CardDescription>Your cloud storage usage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{storageInfo.used.toFixed(1)} GB used</span>
              <span>{storageInfo.total} GB total</span>
            </div>
            <Progress value={storagePercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {remainingStorage.toFixed(1)} GB available
            </p>
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={storageInfo.breakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={1}
                  dataKey="value"
                >
                  {storageInfo.breakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => {
                  // Check if value is a number before calling toFixed
                  return typeof value === 'number' ? `${value.toFixed(1)} GB` : `${value} GB`;
                }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StorageOverview;
