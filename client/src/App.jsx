import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Admissions from './pages/Admissions';
import Departments from './pages/Departments';
import DepartmentDetail from './pages/DepartmentDetail';
import Activities from './pages/Activities';
import Placement from './pages/Placement';
import Administration from './pages/Administration';
import Institution from './pages/Institution';
import Contact from './pages/Contact';
import AllAnnouncements from './pages/AllAnnouncements';
import FullCalendar from './pages/FullCalendar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-announcements" element={<AllAnnouncements />} />
        <Route path="/events-calendar" element={<FullCalendar />} />
        <Route path="/administration" element={<Administration />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/department" element={<Departments />} />
        <Route path="/department/:id" element={<DepartmentDetail />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/placement" element={<Placement />} />
        <Route path="/institution" element={<Institution />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
