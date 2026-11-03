import { WindUnit } from '../types';

export function convertWind(speedInMs: number, unit: WindUnit): number {
  if (isNaN(speedInMs) || speedInMs === null || speedInMs === undefined) return 0;
  switch (unit) {
    case 'ms':
      return speedInMs;
    case 'kmh':
      return speedInMs * 3.6;
    case 'kt':
      return speedInMs * 1.94384;
    case 'mph':
      return speedInMs * 2.23694;
    default:
      return speedInMs;
  }
}

export function formatWind(speedInMs: number, unit: WindUnit, decimals: number = 1): string {
  const converted = convertWind(speedInMs, unit);
  return converted.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function getUnitLabel(unit: WindUnit): string {
  switch (unit) {
    case 'ms':
      return 'm/s';
    case 'kmh':
      return 'km/h';
    case 'kt':
      return 'nós';
    case 'mph':
      return 'mph';
    default:
      return 'm/s';
  }
}

export interface BeaufortInfo {
  grade: number;
  name: string;
  description: string;
  color: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
}

export function getBeaufortScale(speedInMs: number): BeaufortInfo {
  const s = Math.max(0, speedInMs || 0);

  if (s < 0.5) {
    return {
      grade: 0,
      name: 'Calmo',
      description: 'Fumaça sobe verticalmente. Ar quase estagnado.',
      color: '#38bdf8', // sky-400
      bgClass: 'bg-sky-500/10',
      borderClass: 'border-sky-500/30',
      textClass: 'text-sky-400',
    };
  } else if (s < 1.6) {
    return {
      grade: 1,
      name: 'Aragem Leve',
      description: 'Fumaça indica direção do vento, folhas quase imóveis.',
      color: '#0ea5e9', // sky-500
      bgClass: 'bg-sky-500/15',
      borderClass: 'border-sky-500/40',
      textClass: 'text-sky-400',
    };
  } else if (s < 3.4) {
    return {
      grade: 2,
      name: 'Brisa Leve',
      description: 'Vento sentido na face, folhas sussurram suavemente.',
      color: '#10b981', // emerald-500
      bgClass: 'bg-emerald-500/15',
      borderClass: 'border-emerald-500/40',
      textClass: 'text-emerald-400',
    };
  } else if (s < 5.5) {
    return {
      grade: 3,
      name: 'Brisa Fraca',
      description: 'Folhas e galhos finos em movimento constante.',
      color: '#84cc16', // lime-500
      bgClass: 'bg-lime-500/15',
      borderClass: 'border-lime-500/40',
      textClass: 'text-lime-400',
    };
  } else if (s < 8.0) {
    return {
      grade: 4,
      name: 'Brisa Moderada',
      description: 'Levanta poeira e papéis soltos, pequenos galhos balançam.',
      color: '#eab308', // yellow-500
      bgClass: 'bg-yellow-500/15',
      borderClass: 'border-yellow-500/40',
      textClass: 'text-yellow-400',
    };
  } else if (s < 10.8) {
    return {
      grade: 5,
      name: 'Brisa Forte',
      description: 'Pequenas árvores balançam, cristas de ondas em águas interiores.',
      color: '#f97316', // orange-500
      bgClass: 'bg-orange-500/15',
      borderClass: 'border-orange-500/40',
      textClass: 'text-orange-400',
    };
  } else if (s < 13.9) {
    return {
      grade: 6,
      name: 'Vento Fresco',
      description: 'Grandes ramos balançam, fios elétricos assobiam.',
      color: '#ef4444', // red-500
      bgClass: 'bg-red-500/15',
      borderClass: 'border-red-500/40',
      textClass: 'text-red-400',
    };
  } else if (s < 17.2) {
    return {
      grade: 7,
      name: 'Vento Forte',
      description: 'Árvores inteiras balançam, difícil caminhar contra o vento.',
      color: '#dc2626', // red-600
      bgClass: 'bg-red-600/20',
      borderClass: 'border-red-600/50',
      textClass: 'text-red-300',
    };
  } else {
    return {
      grade: 8,
      name: 'Ventania / Temporal',
      description: 'Galhos quebram, pequenos danos em estruturas.',
      color: '#a855f7', // purple-500
      bgClass: 'bg-purple-500/20',
      borderClass: 'border-purple-500/50',
      textClass: 'text-purple-300',
    };
  }
}

export function getWindDirection(deg: number): { label: string; name: string } {
  if (deg === null || deg === undefined || isNaN(deg)) return { label: '--', name: 'Indeterminado' };
  const normalized = ((deg % 360) + 360) % 360;
  const sectors = [
    { label: 'N', name: 'Norte', min: 348.75, max: 11.25 },
    { label: 'NNE', name: 'Nor-Nordeste', min: 11.25, max: 33.75 },
    { label: 'NE', name: 'Nordeste', min: 33.75, max: 56.25 },
    { label: 'ENE', name: 'Lés-Nordeste', min: 56.25, max: 78.75 },
    { label: 'L', name: 'Leste', min: 78.75, max: 101.25 },
    { label: 'ESE', name: 'Lés-Sudeste', min: 101.25, max: 123.75 },
    { label: 'SE', name: 'Sudeste', min: 123.75, max: 146.25 },
    { label: 'SSE', name: 'Sul-Sudeste', min: 146.25, max: 168.75 },
    { label: 'S', name: 'Sul', min: 168.75, max: 191.25 },
    { label: 'SSO', name: 'Sul-Sudoeste', min: 191.25, max: 213.75 },
    { label: 'SO', name: 'Sudoeste', min: 213.75, max: 236.25 },
    { label: 'OSO', name: 'Oés-Sudoeste', min: 236.25, max: 258.75 },
    { label: 'O', name: 'Oeste', min: 258.75, max: 281.25 },
    { label: 'ONO', name: 'Oés-Noroeste', min: 281.25, max: 303.75 },
    { label: 'NO', name: 'Noroeste', min: 303.75, max: 326.25 },
    { label: 'NNO', name: 'Nor-Noroeste', min: 326.25, max: 348.75 },
  ];

  for (const s of sectors) {
    if (s.min > s.max) {
      if (normalized >= s.min || normalized < s.max) return s;
    } else {
      if (normalized >= s.min && normalized < s.max) return s;
    }
  }

  return { label: 'N', name: 'Norte' };
}

export const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const MONTH_SHORT = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
];

export function formatDateBR(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}

export function formatDateExtenso(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const day = parseInt(parts[2], 10);
    const month = parseInt(parts[1], 10);
    const year = parts[0];
    const monthName = MONTH_NAMES[month - 1] || '';
    return `${day} de ${monthName} de ${year}`;
  }
  return dateStr;
}

export function getDayOfWeekName(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const days = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
  ];
  return days[date.getDay()];
}
