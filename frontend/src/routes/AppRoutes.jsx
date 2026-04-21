import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Home from "../pages/user/Home";
import JobApplication from "../pages/user/JobApplication";
import Status from "../pages/user/Status";
import Announcements from "../pages/user/Announcements";
import Contact from "../pages/user/Contact";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />
        <Route path="/application" element={<JobApplication />} />
        <Route path="/status" element={<Status />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;