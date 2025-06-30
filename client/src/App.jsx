import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

// Labor Pages
import RegisterLabor from "./pages/Labor/RegisterLabor";
import JobSearch from "./pages/Labor/JobSearch";
import JobApplications from "./pages/Labor/JobApplications";
import ProfileManagement from "./pages/Labor/ProfileManagement";

// Client Pages
import RegisterClient from "./pages/Client/RegisterClient";

// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageUsers from "./pages/Admin/ManageUsers";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

          {/* Labor Routes */}
          <Route path="/register-labor" element={<RegisterLabor />} />
          <Route path="/labor/job-search" element={<JobSearch />} />
          <Route path="/labor/applications" element={<JobApplications />} />
          <Route path="/labor/profile" element={<ProfileManagement />} />

          {/* Client Routes */}
          <Route path="/register-client" element={<RegisterClient />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
        </Routes>
      </Layout>
    </Router>
  );
}
