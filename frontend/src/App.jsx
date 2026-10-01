import { Navigate, Route, Routes } from 'react-router-dom';
import TherapistLayout from './components/layout/TherapistLayout';
import Dashboard from './pages/therapist/Dashboard';
import Patients from './pages/therapist/Patients';
import PatientProfile from './pages/therapist/PatientProfile';
import Sessions from './pages/therapist/Sessions';
import Exercises from './pages/therapist/Exercises';
import Assessments from './pages/therapist/Assessments';
import Reports from './pages/therapist/Reports';
import Analytics from './pages/therapist/Analytics';
import Notifications from './pages/therapist/Notifications';
import Settings from './pages/therapist/Settings';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/therapist/dashboard" replace />} />
      <Route element={<TherapistLayout />}>
        <Route path="/therapist/dashboard" element={<Dashboard />} />
        <Route path="/therapist/patients" element={<Patients />} />
        <Route path="/therapist/patients/:id" element={<PatientProfile />} />
        <Route path="/therapist/sessions" element={<Sessions />} />
        <Route path="/therapist/exercises" element={<Exercises />} />
        <Route path="/therapist/assessments" element={<Assessments />} />
        <Route path="/therapist/reports" element={<Reports />} />
        <Route path="/therapist/analytics" element={<Analytics />} />
        <Route path="/therapist/notifications" element={<Notifications />} />
        <Route path="/therapist/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
