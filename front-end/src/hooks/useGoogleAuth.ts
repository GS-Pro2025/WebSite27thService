import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useGoogleAuth = (onClose: () => void) => {
  const navigate = useNavigate();

  const handleGoogleAuth = async (googleToken: string) => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login/google", {
        token: googleToken,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);

        if (res.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      }

      console.log("Successful Google Auth:", res.data);
      onClose();
    } catch (error: any) {
      console.error("Error in Google Auth:", error.response?.data || error.message);
    }
  };

  return { handleGoogleAuth };
};
