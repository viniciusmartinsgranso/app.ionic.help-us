import { OccurrenceTypeEnum } from '../enums/occurrence-type.enum';
import { OccurrenceProxy } from '../proxies/occurrence.proxy';
import { mockedUsers } from './user.mock';

export const mockedOccurrences: OccurrenceProxy[] = [
  {
    title: 'Falta de Iluminação',
    description: 'Poste da rua 7 de setembro apagado a 2 dias. Área pouco movimentada durante a noite, risco de assaltos potencialmente maior.',
    location: 'Sorocaba',
    type: OccurrenceTypeEnum.COOP,
    id: 0,
    photoUrl: 'assets/images/poste-sem-luz.jpg',
    user: mockedUsers[0],
  },
  {
    title: 'Batida na Raposo',
    description: 'Houve uma batida de carro na Rodovia Raposo Tavares',
    location: 'Sorocaba, Raposo Tavares km 20',
    type: OccurrenceTypeEnum.CRASH,
    id: 0,
    photoUrl: 'assets/images/acidente-raposo-tavares.jpg',
    user: mockedUsers[1],
  },
  {
    title: 'Incendio no Predio da Vila Fiori',
    description: 'O terceiro andar do predio na vila Fiori esta em chamas.',
    location: 'Rua Francisco Catalano - Vila Fiori - Sorocaba',
    type: OccurrenceTypeEnum.FIRE,
    id: 0,
    photoUrl: 'assets/images/incendio-occurrence.jpg',
    user: mockedUsers[2],
  }
];
