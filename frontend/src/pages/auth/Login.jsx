import API_BASE_URL from "../api";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, Briefcase } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Full name is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ FIXED LOGIN FUNCTION (connected to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("Login successful");

        // redirect to PHP dashboard
        window.location.href = "http://localhost/IP_2-project/dashboard.php";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0D0D0D] to-[#222221] text-white">
      <div className="w-[90%] max-w-sm bg-[#1F1F1F] p-6 rounded-[22px] shadow-[0_0_40px_rgba(0,0,0,0.3)]">

        {/* ICON */}
        <div className="flex justify-center mb-5">
          <div className="w-[54px] h-[54px] rounded-[14px] flex items-center justify-center bg-gradient-to-b from-[#C79A71] to-[#A26D44]">
            <Briefcase size={26} className="text-[#1B1B1B]" />
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center mb-1">Login</h2>

        <p className="text-center text-xs text-[#A0A0A0] mb-6">
          Enter your credentials to access the system
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* FULL NAME */}
          <div>
            <label className="block text-[11px] text-[#A0948C] mb-1">
              FULL NAME
            </label>

            <div className="flex items-center bg-[#222121] border border-[#252423] rounded-[14px] px-3 h-[52px]">
              <User size={18} className="text-[#777777] mr-2" />
              <input
                name="name"
                onChange={handleChange}
                type="text"
                className="bg-transparent w-full outline-none text-[#EDEDED]"
              />
            </div>
            {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-[11px] text-[#A0948C] mb-1">
              EMAIL ADDRESS
            </label>

            <div className="flex items-center bg-[#222121] border border-[#252423] rounded-[14px] px-3 h-[52px]">
              <Mail size={18} className="text-[#777777] mr-2" />
              <input
                name="email"
                onChange={handleChange}
                type="email"
                className="bg-transparent w-full outline-none text-[#EDEDED]"
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-[11px] text-[#A0948C] mb-1">
              PASSWORD
            </label>

            <div className="flex items-center bg-[#222121] border border-[#252423] rounded-[14px] px-3 h-[52px]">
              <Lock size={18} className="text-[#777777] mr-2" />

              <input
                name="password"
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                className="bg-transparent w-full outline-none text-[#EDEDED]"
              />

              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={18} className="text-[#777]" />
                ) : (
                  <Eye size={18} className="text-[#777]" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-400 text-xs">{errors.password}</p>
            )}
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full h-[54px] rounded-[16px] bg-gradient-to-r from-[#E3B286] to-[#C48D5D] text-[#1A1A1A] font-semibold"
          >
            Login →
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
