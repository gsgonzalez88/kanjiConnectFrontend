import { Jlpt, Transitivity } from 'src/app/shared/models/custom-types.model';
import { Difficulty } from '../../shared/models/custom-types.model';

export interface Card {
  main: string,
  hint: string,
  jlpt: Jlpt,
  difficulty: Difficulty,
  _id: string
}

export interface ExpressionCard extends Card {
  reading: string,
  englishMeaning: string[],
  japaneseMeaning: string[],
  exampleSentences: string[],
  transitivity: Transitivity
}

export interface UserKanjiCard extends Card {
  onReadings: string[],
  kunReadings: string[],
  meanings: string[],
  expressions: {
    word: string,
    reading: string
  }[]
}

export const emptyExpressionCard: ExpressionCard = {
  main: '',
  hint: '',
  reading: '',
  englishMeaning: [],
  japaneseMeaning: [],
  exampleSentences: [],
  jlpt: null,
  difficulty: 5,
  transitivity: null,
  _id: ''
}
