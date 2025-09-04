import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    password_hash: "",
  });

  const { handleGoogleAuth } = useGoogleAuth(onClose);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);

        if (res.data.user.role === "admin") {
          window.location.href = "/admin-dashboard";
        } else {
          window.location.href = "/user-dashboard";
        }
      }

      console.log("Login successfully:", res.data);
      onClose();
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0F6F7C]/80 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign In</h2>

        {/* ---- FORM LOGIN NORMAL ---- */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg text-black"
            required
          />
          <input
            type="password"
            name="password_hash"
            placeholder="Password"
            value={formData.password_hash}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg text-black"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#FFE67B] text-black font-semibold py-2 rounded-lg hover:bg-[#FFD84D] transition"
          >
            Sign In
          </button>
        </form>

        {/* ---- SEPARADOR ---- */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* ---- BOTÓN GOOGLE ---- */}
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
              handleGoogleAuth(credentialResponse.credential);
            }
          }}
          onError={() => {
            console.log("Error in Google Auth");
          }}
        />

        <button
          onClick={onClose}
          className="mt-4 w-full text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginModal;