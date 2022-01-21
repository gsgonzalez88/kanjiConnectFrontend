import { Jlpt } from "../../shared/models/custom-types.model";

export interface Kanji {
  kanji: string,
  on_readings: string[],
  kun_readings: string[],
  meanings: string[],
  grade: number,
  jlpt: Jlpt,
  _id: string,
}

export const emptyKanji = {
  kanji: '',
  on_readings: [],
  kun_readings: [],
  meanings: [],
  grade: 0,
  jlpt: null,
  _id: '',
}
