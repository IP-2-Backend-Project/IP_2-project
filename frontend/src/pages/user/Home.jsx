import { useNavigate } from "react-router-dom";
import {
  Home,
  Briefcase,
  FileText,
  Bell,
  Phone,
  LogOut,
} from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-[#0B0B0C] text-white">

      {/* ================= SINGLE SIDEBAR ================= */}
      <aside className="w-[260px] bg-[#0E0E0E] border-r border-[#1F1F1F] flex flex-col justify-between p-5">

        {/* PROFILE SECTION */}
        <div>

          <div className="mb-6 text-center">

            {/* Avatar */}
            <div className="w-14 h-14 mx-auto bg-gray-700 rounded-md flex items-center justify-center text-lg font-bold">
              U
            </div>

            {/* User Info */}
            <h2 className="mt-3 text-sm font-semibold">
              Guest User
            </h2>

            <p className="text-xs text-gray-400">
              No email
            </p>

            <span className="text-[10px] text-[#D7A679] tracking-widest">
              PROFESSIONAL
            </span>

          </div>

          {/* NAVIGATION MENU */}
          <nav className="space-y-2 text-sm mt-8">

            <NavItem label="Home" active onClick={() => navigate("/home")} />
            <NavItem label="Job Application" onClick={() => navigate("/application")} />
            <NavItem label="Application Status" />
            <NavItem label="Announcements" />
            <NavItem label="Contact" />

          </nav>

        </div>

        {/* LOGOUT */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-white"
        >
          <LogOut size={16} />
          Logout
        </div>

      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-8 overflow-y-auto">

        {/* HERO */}
        <div className="mb-10">

          <h1 className="text-[34px] font-bold">
            Curate Your Professional Legacy.
          </h1>

          <p className="text-gray-400 mt-3 max-w-xl">
            Welcome to the gallery of excellence. Explore hand-picked opportunities and find your next masterpiece.
          </p>

          <div className="flex gap-3 mt-5">
            <button className="px-4 py-2 bg-[#C48D5D] text-black rounded">
              View Openings
            </button>

            <button className="px-4 py-2 border border-gray-600 rounded">
              Our Vision
            </button>
          </div>

        </div>

        {/* JOB CATEGORIES */}
        <div className="mb-10">

          <div className="flex justify-between mb-4">
            <h2 className="font-semibold">Job Categories</h2>
            <span className="text-xs text-[#C48D5D]">BROWSE COLLECTION</span>
          </div>

          <div className="grid grid-cols-3 gap-4">

            <div className="col-span-2 bg-[#1E1D1C] p-6 rounded-xl">
              <h3 className="text-lg">Find your Job</h3>
              <p className="text-[#C48D5D] text-sm mt-2">
                Explore Collection →
              </p>
            </div>

            <div className="space-y-4">

              <div className="bg-[#1E1D1C] p-4 rounded-xl">
                Engineering
                <p className="text-xs text-gray-400">
                  12 POSITIONS AVAILABLE
                </p>
              </div>

              <div className="bg-[#1E1D1C] p-4 rounded-xl">
                Executive Leadership
                <p className="text-xs text-gray-400">
                  6 POSITIONS AVAILABLE
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* JOB LIST */}
        <div>
          <h2 className="font-semibold mb-4">Available Jobs</h2>

          <div className="flex gap-4 overflow-x-auto">

            <JobCard title="Frontend Developer" />
            <JobCard title="Backend Engineer" />
            <JobCard title="UI/UX Designer" />

          </div>
        </div>

      </main>

    </div>
  );
}

/* ================= COMPONENTS ================= */

function NavItem({ label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`px-3 py-2 rounded cursor-pointer transition ${
        active
          ? "bg-[#171717] text-[#D8B07A]"
          : "text-gray-400 hover:bg-[#171717]"
      }`}
    >
      {label}
    </div>
  );
}

function JobCard({ title }) {
  return (
    <div className="min-w-[200px] bg-[#1E1D1C] p-4 rounded-xl border border-[#2A2A2A]">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-xs text-gray-400 mt-2">Remote</p>
    </div>
  );
}