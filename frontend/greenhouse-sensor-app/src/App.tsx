import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import RegisterSensorPage from './pages/RegisterSensorPage';
import ReportsPage from './pages/ReportsPage';
import AlarmsPage from './pages/AlarmsPage';
import SensorDataPage from './pages/SensorDataPage';
import LoginPage from './pages/LoginPage';
import RegisterUserPage from './pages/RegisterUserPage';

function App() {
  return (
    <Router>
      <NavigationBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register-sensor" element={<RegisterSensorPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/alarms" element={<AlarmsPage />} />
          <Route path="/sensor-data" element={<SensorDataPage />} />
          <Route path="/register" element={<RegisterUserPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;