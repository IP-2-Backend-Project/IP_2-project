import {
  Home,
  Briefcase,
  FileText,
  Bell,
  Phone,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handlePhotoClick = () => {
    fileRef.current.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    const updatedUser = {
      ...user,
      photo: imageUrl,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const getInitial = (name) =>
    name ? name.charAt(0).toUpperCase() : "U";

  const NavItem = ({ icon, label, path }) => (
    <div
      onClick={() => navigate(path)}
      className="flex items-center gap-2 px-3 py-2 rounded-[12px] cursor-pointer text-[#9B9B9B] hover:bg-[#171615]"
    >
      {icon}
      {label}
    </div>
  );

  return (
    <aside className="w-[240px] bg-[#0E0E0E] border-r border-[#1F1F1F] p-5 flex flex-col justify-between">

      <div>

        {/* hidden upload */}
        <input
          type="file"
          ref={fileRef}
          onChange={handlePhotoChange}
          className="hidden"
          accept="image/*"
        />

        {/* PROFILE */}
        <div className="mb-8">

          {user.photo ? (
            <img
              src={user.photo}
              onClick={handlePhotoClick}
              className="w-12 h-12 rounded-[10px] mb-3 object-cover cursor-pointer"
            />
          ) : (
            <div
              onClick={handlePhotoClick}
              className="w-12 h-12 rounded-[10px] bg-gray-700 mb-3 flex items-center justify-center cursor-pointer"
            >
              {getInitial(user.name)}
            </div>
          )}

          <h2 className="text-xs font-bold text-[#EDEDED]">
            {user.name || "Guest User"}
          </h2>

          <p className="text-[10px] text-[#888]">
            {user.email || "No email"}
          </p>

          <span className="text-[10px] text-[#D7A679]">
            PROFESSIONAL
          </span>
        </div>

        {/* NAVIGATION */}
        <div className="space-y-2 text-sm">

          <NavItem icon={<Home size={16} />} label="Home" path="/home" />
          <NavItem icon={<Briefcase size={16} />} label="Job Application" path="/application" />
          <NavItem icon={<FileText size={16} />} label="Application Status" path="/status" />
          <NavItem icon={<Bell size={16} />} label="Announcements" path="/announcements" />
          <NavItem icon={<Phone size={16} />} label="Contact" path="/contact" />

        </div>
      </div>

      {/* LOGOUT */}
      <div
        onClick={handleLogout}
        className="flex items-center gap-2 text-[#6E6E6E] cursor-pointer"
      >
        <LogOut size={16} />
        Logout
      </div>
    </aside>
  );
};

export default Sidebar;