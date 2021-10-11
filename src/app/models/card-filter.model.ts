export interface CardFilter {
  user: string;
  type?: 'expressions' | 'kanjis';
  lesson?: string;
  tags?: string[];
}
