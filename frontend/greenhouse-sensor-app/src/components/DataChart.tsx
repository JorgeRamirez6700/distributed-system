import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataChartProps {
  data: Array<{ timestamp: string; value: number }>;
  type: 'temperature' | 'humidity';
}

const DataChart = ({ data, type }: DataChartProps) => {
  const color = type === 'temperature' ? '#ff6384' : '#36a2eb';
  const unit = type === 'temperature' ? '°C' : '%';

  return (
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis unit={unit} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            name={type === 'temperature' ? 'Temperatura' : 'Humedad'}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DataChart;