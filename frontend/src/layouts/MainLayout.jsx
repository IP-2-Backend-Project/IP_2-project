import Sidebar from "../components/layout/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#0B0B0C] text-white">

      {/* ONLY ONE SIDEBAR */}
      <Sidebar />

      {/* PAGE CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>

    </div>
  );
};

export default MainLayout;