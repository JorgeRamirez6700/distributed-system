import { useState, useEffect } from 'react';
import DataChart from '../components/DataChart';
import { mockRealTimeData } from '../api/mockData';

const SensorDataPage = () => {
  const [realTimeData, setRealTimeData] = useState<Array<{ timestamp: string; value: number }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => [...prev.slice(-9), mockRealTimeData()]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-container">
      <h1>Real Time Data</h1>
      <DataChart data={realTimeData} type="temperature" />
    </div>
  );
};

export default SensorDataPage;