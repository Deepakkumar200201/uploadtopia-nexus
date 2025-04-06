
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page
    navigate("/");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-terabox-100 to-terabox-50 dark:from-terabox-900 dark:to-terabox-800 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">TeraBox - Cloud Storage</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Secure cloud storage for all your files</p>
        <Button size="lg" onClick={() => navigate("/")}>
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Index;
