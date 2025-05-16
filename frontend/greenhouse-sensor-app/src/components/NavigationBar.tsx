import { Link } from 'react-router-dom';
import './NavigationBar.module.css';

const NavigationBar = () => {
  return (
    <nav>
      <div className="container">
        <h1>Gewächs GreenHouse</h1>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register-sensor">Register sensor</Link>
          </li>
          <li>
            <Link to="/reports">Reports</Link>
          </li>
          <li>
            <Link to="/alarms">Alarms</Link>
          </li>
          <li>
            <Link to="/sensor-data">Sensor Data</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;