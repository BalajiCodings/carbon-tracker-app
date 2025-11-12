export interface AwarenessResource {
  id: string;
  title: string;
  type: 'video' | 'article' | 'document';
  url: string;
  category: string;
  description: string;
}

export interface Device {
  id: string;
  deviceName: string;
  wattage: number;
  activityTime: number;
  emissionFactor: number;
  createdAt: Date;
}

export const mockResources: AwarenessResource[] = [
  {
    id: '1',
    title: 'Understanding Home Energy Usage',
    type: 'video',
    url: '#',
    category: 'Energy Basics',
    description: 'Learn how household appliances consume energy and ways to reduce usage.'
  },
  {
    id: '2',
    title: 'Solar Panel Installation Guide',
    type: 'article',
    url: '#',
    category: 'Renewable Energy',
    description: 'Complete guide to installing solar panels in your home.'
  },
  {
    id: '3',
    title: 'Carbon Footprint Calculator',
    type: 'document',
    url: '#',
    category: 'Carbon Tracking',
    description: 'Download our comprehensive carbon footprint calculation worksheet.'
  },
  {
    id: '4',
    title: 'LED vs Traditional Bulbs',
    type: 'article',
    url: '#',
    category: 'Energy Efficiency',
    description: 'Compare energy consumption and cost savings between LED and traditional lighting.'
  },
  {
    id: '5',
    title: 'Smart Home Energy Management',
    type: 'video',
    url: '#',
    category: 'Technology',
    description: 'Discover how smart devices can help you save energy and money.'
  },
  {
    id: '6',
    title: 'Weatherproofing Your Home',
    type: 'document',
    url: '#',
    category: 'Energy Efficiency',
    description: 'Tips and techniques for improving home insulation and reducing energy loss.'
  }
];

export const mockDevices: Device[] = [
  {
    id: '1',
    deviceName: 'Refrigerator',
    wattage: 150,
    activityTime: 24,
    emissionFactor: 0.5,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    deviceName: 'LED TV',
    wattage: 80,
    activityTime: 5,
    emissionFactor: 0.5,
    createdAt: new Date('2024-01-16')
  },
  {
    id: '3',
    deviceName: 'Washing Machine',
    wattage: 500,
    activityTime: 2,
    emissionFactor: 0.5,
    createdAt: new Date('2024-01-17')
  }
];

const DEVICES_KEY = 'energy_app_devices';
const RESOURCES_KEY = 'energy_app_resources';

export const getStoredDevices = (): Device[] => {
  const stored = localStorage.getItem(DEVICES_KEY);
  return stored ? JSON.parse(stored) : mockDevices;
};

export const setStoredDevices = (devices: Device[]) => {
  localStorage.setItem(DEVICES_KEY, JSON.stringify(devices));
};

export const getStoredResources = (): AwarenessResource[] => {
  const stored = localStorage.getItem(RESOURCES_KEY);
  return stored ? JSON.parse(stored) : mockResources;
};

export const setStoredResources = (resources: AwarenessResource[]) => {
  localStorage.setItem(RESOURCES_KEY, JSON.stringify(resources));
};
