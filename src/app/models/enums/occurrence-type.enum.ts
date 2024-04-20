export enum OccurrenceTypeEnum {
  CRASH = 0,
  FIRE = 1,
  CAVE_IN = 2,
  COOP = 3,
}

export const occurrenceTypeIconRecord: Record<OccurrenceTypeEnum, string> = {
  [OccurrenceTypeEnum.CRASH]: 'assets/images/occurrence/batida.svg',
  [OccurrenceTypeEnum.FIRE]: 'assets/images/occurrence/incendio.svg',
  [OccurrenceTypeEnum.CAVE_IN]: 'assets/images/occurrence/desmoronamento.svg',
  [OccurrenceTypeEnum.COOP]: 'assets/images/occurrence/policia.svg',
};

export const occurrenceTypeTranslate: Record<OccurrenceTypeEnum, string> = {
  [OccurrenceTypeEnum.CRASH]: 'Batida',
  [OccurrenceTypeEnum.FIRE]: 'Incendio',
  [OccurrenceTypeEnum.CAVE_IN]: 'Desmoronamento',
  [OccurrenceTypeEnum.COOP]: 'Policia',
};

export const occurrenceTypeWhiteImage: Record<OccurrenceTypeEnum, string> = {
  [OccurrenceTypeEnum.FIRE]: 'assets/images/occurrence/incendio-white.svg',
  [OccurrenceTypeEnum.COOP]: 'assets/images/occurrence/policia-white.svg',
  [OccurrenceTypeEnum.CRASH]: 'assets/images/occurrence/batida-white.svg',
  [OccurrenceTypeEnum.CAVE_IN]: 'assets/images/occurrence/desmoronamento-white.svg'
};
