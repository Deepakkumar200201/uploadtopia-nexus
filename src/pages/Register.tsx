
import AuthForm from "@/components/auth/AuthForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("terabox_token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-terabox-100 to-terabox-50 dark:from-terabox-900 dark:to-terabox-800 p-4">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 rounded-full bg-terabox-600 flex items-center justify-center text-white font-bold text-xl mr-3">
          T
        </div>
        <h1 className="text-3xl font-bold">TeraBox</h1>
      </div>
      <AuthForm isRegister={true} />
    </div>
  );
};

export default Register;
