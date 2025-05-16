<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import RegisterSensorPage from './pages/RegisterSensorPage';
import ReportsPage from './pages/ReportsPage';
import AlarmsPage from './pages/AlarmsPage';
import SensorDataPage from './pages/SensorDataPage';
import LoginPage from './pages/LoginPage';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
>>>>>>> f8ff6ae0cc800535e34350d21d14dd9f601d3597
