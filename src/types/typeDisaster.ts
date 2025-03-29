interface Disaster {
  id: number;
  type: string;
  title: string;
  location: [number, number];
  severity: string;
  status: string;
  description?: string;
  timestamp?: string;
}