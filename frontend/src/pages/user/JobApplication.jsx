import {
  Home,
  Briefcase,
  FileText,
  Bell,
  Phone,
  LogOut,
  Hourglass,
  Users,
  Archive,
  UploadCloud,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

export default function JobApplicationDashboard() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  // ================= USER CASE (SAME AS HOME PAGE) =================
  const [user, setUser] = useState({});
  const [fileName, setFileName] = useState("");

  // ================= SHARED APP DATA (JOB POSITIONS) =================
  const [appData, setAppData] = useState({ jobs: [] });

  useEffect(() => {
    // USER
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    setUser(storedUser);

    // APP DATA (shared job list)
    const storedApp = JSON.parse(localStorage.getItem("appData"));

    if (storedApp) {
      setAppData(storedApp);
    } else {
      // default dummy data (until admin updates later)
      const defaultData = {
        jobs: [
          "Frontend Developer",
          "Backend Engineer",
          "UI/UX Designer",
          "Data Analyst",
        ],
      };

      localStorage.setItem("appData", JSON.stringify(defaultData));
      setAppData(defaultData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const getInitial = (name) =>
    name ? name.charAt(0).toUpperCase() : "U";

  // ================= FILE UPLOAD =================
  const handleUploadClick = () => {
    fileRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files allowed");
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      alert("Max size is 25MB");
      return;
    }

    setFileName(file.name);

    localStorage.setItem(
      "applicationFile",
      JSON.stringify({ name: file.name })
    );
  };

  return (
    <div className="min-h-screen flex bg-[#0B0B0C] text-[#EDEDED] font-sans">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-[240px] bg-[#0F0F10] border-r border-[#1F1F1F] flex flex-col justify-between p-5">

        <div>

          {/* PROFILE (same behavior as Home page) */}
          <div>
            <div className="w-12 h-12 bg-[#1A1A1A] rounded-md flex items-center justify-center text-sm">
              {getInitial(user.name)}
            </div>

            <div className="mt-3">
              <div className="text-[#D8B07A] font-bold text-sm">
                {user.name || "Guest User"}
              </div>
              <div className="text-xs text-[#7A7A7A]">
                {user.email || "No email"}
              </div>
              <div className="text-[9px] text-[#C28B4B] tracking-widest mt-1">
                PREMIUM MEMBER
              </div>
            </div>
          </div>

          {/* NAV */}
          <div className="mt-8 space-y-2">

            <NavItem icon={<Home size={16} />} label="Home" onClick={() => navigate("/home")} />
            <NavItem icon={<Briefcase size={16} />} label="Job Application" active />
            <NavItem icon={<FileText size={16} />} label="Application Status" onClick={() => navigate("/status")} />
            <NavItem icon={<Bell size={16} />} label="Announcements" onClick={() => navigate("/announcements")} />
            <NavItem icon={<Phone size={16} />} label="Contact" onClick={() => navigate("/contact")} />

          </div>
        </div>

        <div
          onClick={handleLogout}
          className="flex items-center gap-2 text-[#5F5F5F] cursor-pointer"
        >
          <LogOut size={16} />
          Logout
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-8">

        {/* HEADER */}
        <div className="flex justify-between">
          <div>
            <h2 className="text-[18px] text-[#6F6F6F]">
            
            </h2>

            <div className="mt-10">
              <p className="text-[9px] text-[#A67A4D] tracking-widest">
                PERSONAL PORTFOLIO
              </p>
              <h1 className="text-[22px] font-bold">My Applications</h1>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="flex gap-5 mt-10">
          <Stat icon={<Hourglass />} number="3" label="IN PROGRESS" />
          <Stat icon={<Users />} number="1" label="INTERVIEWED" />
          <Stat icon={<Archive />} number="0" label="ARCHIVED" />
        </div>

        {/* HERO */}
        <div className="text-center mt-12">
          <h2 className="text-[34px] font-extrabold mt-2">
            Craft Your Career
          </h2>
        </div>

        {/* FORM */}
        <div className="mt-10 w-[650px] mx-auto bg-[#171717]/80 backdrop-blur border border-[#262626] rounded-[14px] p-6">

          <div className="grid grid-cols-2 gap-4">
            <Input label="FULL NAME" />
            <Input label="EMAIL ADDRESS" />
            <Input label="PHONE NUMBER" />

            {/* ================= JOB POSITION (FIXED DYNAMIC) ================= */}
            <div>
              <label className="text-[9px] text-[#6A6A6A] tracking-widest">
                JOB POSITION
              </label>

              <select className="w-full mt-1 h-[42px] bg-[#0E0E0E] border border-[#202020] rounded-[8px] px-3 text-sm outline-none">
                <option value="">Select Job Position</option>

                {appData.jobs.map((job, i) => (
                  <option key={i} value={job}>
                    {job}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <textarea
            className="w-full mt-4 h-[90px] bg-[#0E0E0E] border border-[#202020] rounded-[10px] p-3 text-sm"
            placeholder="List your skills..."
          />

          {/* ================= UPLOAD ================= */}
          <div
            onClick={handleUploadClick}
            className="mt-4 border border-dashed border-[#333] bg-[#141414] rounded-[10px] h-[100px] flex flex-col items-center justify-center cursor-pointer"
          >
            <input
              type="file"
              ref={fileRef}
              onChange={handleFileChange}
              className="hidden"
              accept="application/pdf"
            />

            <UploadCloud className="text-[#6B6B6B]" />

            {fileName ? (
              <p className="text-[#C28B4B] text-[12px]">
                {fileName}
              </p>
            ) : (
              <>
                <p className="text-[12px] text-[#6B6B6B]">
                  Drag and drop your PDF portfolio OR click to upload
                </p>
                <p className="text-[10px] text-[#6B6B6B]">
                  Maximum file size: 25MB
                </p>
              </>
            )}
          </div>

          <button className="mt-6 w-full h-[52px] bg-gradient-to-r from-[#D2A36B] to-[#A87842] text-[#1A120A] font-bold flex items-center justify-center gap-2 rounded-[10px]">
            SUBMIT APPLICATION <ArrowRight size={16} />
          </button>

        </div>

      </main>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function NavItem({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer ${
        active
          ? "bg-[#171717] text-[#D8B07A] border-l-2 border-[#D8B07A]"
          : "text-[#7A7A7A] hover:bg-[#171717]"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

function Stat({ icon, number, label }) {
  return (
    <div className="w-[190px] h-[85px] bg-[#1A1A1A] border border-[#252525] rounded-[10px] flex flex-col items-center justify-center">
      <div className="text-[#C28B4B]">{icon}</div>
      <div className="text-[20px] font-bold">{number}</div>
      <div className="text-[10px] text-[#6D6D6D] tracking-widest">
        {label}
      </div>
    </div>
  );
}

function Input({ label }) {
  return (
    <div>
      <label className="text-[9px] text-[#6A6A6A] tracking-widest">
        {label}
      </label>
      <input className="w-full mt-1 h-[42px] bg-[#0E0E0E] border border-[#202020] rounded-[8px] px-3 text-sm outline-none" />
    </div>
  );
}