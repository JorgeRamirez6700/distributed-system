export const generateMockData = (type: 'temperature' | 'humidity') => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      timestamp: `${i.toString().padStart(2, '0')}:00`,
      value: type === 'temperature' 
        ? Math.floor(20 + Math.random() * 15) 
        : Math.floor(40 + Math.random() * 40)
    });
  }
  return data;
};

export const mockRealTimeData = () => ({
  timestamp: new Date().toLocaleTimeString(),
  value: Math.floor(20 + Math.random() * 15)
});