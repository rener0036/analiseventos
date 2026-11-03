export type WindUnit = 'ms' | 'kmh' | 'kt' | 'mph';

export interface DayWindRecord {
  date: string; // YYYY-MM-DD
  day: number;
  month: number;
  year: number;
  avgSpeed: number; // in m/s
  maxSpeed: number; // in m/s
  minSpeed?: number; // in m/s
  readingsCount?: number;
  dominantDirection?: number; // 0-360 degrees
  directionLabel?: string;
}

export interface MonthWindSummary {
  month: number;
  monthName: string;
  monthShort: string;
  avgSpeed: number;
  maxSpeed: number;
  maxSpeedDate: string;
  minSpeed: number;
  daysCount: number;
  calmDays: number; // < 1.5 m/s
  breezeDays: number; // 1.5 - 5.4 m/s
  strongDays: number; // >= 5.5 m/s
  days: DayWindRecord[];
}

export interface YearWindSummary {
  year: number;
  overallAvg: number;
  overallMax: number;
  overallMaxDate: string;
  overallMin: number;
  totalMonitoredDays: number;
  windiestMonth: { month: number; name: string; avg: number };
  calmestMonth: { month: number; name: string; avg: number };
  windiestDay: { date: string; max: number; avg: number };
  calmestDay: { date: string; avg: number };
  months: MonthWindSummary[];
}

export interface ThingSpeakFeedItem {
  created_at: string;
  entry_id: number;
  field1?: string | null; // Temp
  field2?: string | null; // Umidade
  field3?: string | null; // Pressao
  field4?: string | null; // Vento
  field5?: string | null; // Orvalho
  field6?: string | null; // Direcao
  field7?: string | null; // CO
  field8?: string | null; // CO2
}

export interface ThingSpeakChannelInfo {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
  field7: string;
  field8: string;
  created_at: string;
  updated_at: string;
  last_entry_id: number;
}

export interface LiveStationData {
  channel: ThingSpeakChannelInfo;
  lastReading?: {
    timestamp: string;
    windSpeed: number; // in m/s
    windDirection: number; // degrees
    temperature?: number;
    humidity?: number;
    pressure?: number;
  };
  feedsCount: number;
  isOnline: boolean;
  lastFetchTime: Date;
}

export interface HourlyWindPoint {
  hour: number; // 0 to 23
  timeStr: string;
  avgSpeed: number;
  maxSpeed: number;
  minSpeed: number;
  samples: number;
}
