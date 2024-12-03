import { UUID } from 'crypto';

export interface Figure {
  id: UUID;
  name: string;
  image: string;
  price: number;
  category: 'Marvel' | 'DC' | 'Star Wars' | 'Harry Potter';
  description: string;
}
