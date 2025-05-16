export type Sensor = {
  id: string;
  name: string;
  type: 'temperature' | 'humidity';
  location: string;
  status: 'active' | 'inactive';
};

export type Alarm = {
  id: string;
  type: 'temperature' | 'humidity';
  threshold: number;
  condition: 'greater' | 'less';
};