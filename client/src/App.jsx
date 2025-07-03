import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

// Labor Pages
import RegisterLabor from "./pages/Labor/RegisterLabor";
import LaborDashboard from "./pages/Labor/LaborDashboard";
import JobSearch from "./pages/Labor/JobSearch";
import JobApplications from "./pages/Labor/JobApplications";
import ProfileManagement from "./pages/Labor/ProfileManagement";
// import Notification from "./pages/Labor/Notification";

// Client Pages
import RegisterClient from "./pages/Client/RegisterClient";
import ClientDashboard from "./pages/Client/ClientDashboard.jsx";
import PostJob from "./pages/Client/PostJob";
import MyJobs from "./pages/Client/MyJobs";
import ViewLaborers from "./pages/Client/ViewLaborers";
import RequestLabor from "./pages/Client/RequestLabor";

// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageLaborers from "./pages/Admin/ManageLaborers";
import ManageClients from "./pages/Admin/ManageClients";
import ManageJobs from "./pages/Admin/ManageJobs";

// Optional: NotFound page

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Common Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

          {/* Labor Routes */}
          <Route path="/register-labor" element={<RegisterLabor />} />
          <Route path="/labor/dashboard" element={<LaborDashboard />} />
          <Route path="/labor/job-search" element={<JobSearch />} />
          <Route path="/labor/applications" element={<JobApplications />} />
          <Route path="/labor/profile" element={<ProfileManagement />} />
          <Route path="/labor/notifications" element={<Notification />} />

          {/* Client Routes */}
          <Route path="/register-client" element={<RegisterClient />} />
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/my-jobs" element={<MyJobs />} />
          <Route path="/view-laborers" element={<ViewLaborers />} />
          <Route path="/request-labor" element={<RequestLabor />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/laborers" element={<ManageLaborers />} />
          <Route path="/admin/clients" element={<ManageClients />} />
          <Route path="/admin/jobs" element={<ManageJobs />} />

         
          
        </Routes>
      </Layout>
    </Router>
  );
}
