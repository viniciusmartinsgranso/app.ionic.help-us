export enum OccurrenceTypeEnum {
  CRASH = 0,
  FIRE = 1,
  CAVE_IN = 2,
  WINDS = 3,
  SHOOTING = 4,
}

export const occurrenceTypeIconRecord: Record<OccurrenceTypeEnum, string> = {
  [OccurrenceTypeEnum.CRASH]: 'assets/images/occurrence/batida.svg',
  [OccurrenceTypeEnum.FIRE]: 'assets/images/occurrence/incendio.svg',
  [OccurrenceTypeEnum.CAVE_IN]: 'assets/images/occurrence/desmoronamento.svg',
  [OccurrenceTypeEnum.WINDS]: 'assets/images/occurrence/wind.svg',
  [OccurrenceTypeEnum.SHOOTING]: 'assets/images/occurrence/shooting.svg',
};

export const occurrenceTypeTranslate: Record<OccurrenceTypeEnum, string> = {
  [OccurrenceTypeEnum.CRASH]: 'Batida',
  [OccurrenceTypeEnum.FIRE]: 'Incendio',
  [OccurrenceTypeEnum.CAVE_IN]: 'Desmoronamento',
  [OccurrenceTypeEnum.WINDS]: 'Vento Forte',
  [OccurrenceTypeEnum.SHOOTING]: 'Tiroteiro',
};

export const occurrenceTypeWhiteImage: Record<OccurrenceTypeEnum, string> = {
  [OccurrenceTypeEnum.FIRE]: 'assets/images/occurrence/incendio-white.svg',
  [OccurrenceTypeEnum.CRASH]: 'assets/images/occurrence/batida-white.svg',
  [OccurrenceTypeEnum.CAVE_IN]: 'assets/images/occurrence/desmoronamento-white.svg',
  [OccurrenceTypeEnum.WINDS]: 'assets/images/occurrence/white-wind.svg',
  [OccurrenceTypeEnum.SHOOTING]: 'assets/images/occurrence/white-shooting.svg',
};
