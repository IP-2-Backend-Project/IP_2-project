import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Home from "./pages/user/Home";
import JobApplication from "./pages/user/JobApplication";
import ApplicationStatus from "./pages/user/ApplicationStatus";
import Announcements from "./pages/user/Announcements";
import Contact from "./pages/user/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/" element={<Login />} />

        {/* USER PAGES */}
        <Route path="/home" element={<Home />} />
        <Route path="/application" element={<JobApplication />} />
        <Route path="/status" element={<ApplicationStatus />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;