import { Jlpt } from 'src/app/models/custom-types.model';
import { Difficulty } from "./custom-types.model";
import { Expression } from "./expression.model";
import { emptyKanji, Kanji } from "./kanji.model";
import { emptyUser, User } from "./user.model";

export interface UserKanji {
  difficulty: Difficulty,
  expressions: Expression[],
  kanji: Kanji,
  created: Date,
  updated: Date,
  user: User,
  _id: string,
}

export interface UserKanjiFilter {
  user: string,
  difficulty?: Difficulty,
  lesson?: string,
  tags?: string[],
  jlpt?: Jlpt,
  kanjiAsCharacter?: string
}

export const emptyUserKanji: UserKanji = {
  difficulty: 5,
  expressions: [],
  kanji: emptyKanji,
  created: new Date,
  updated: new Date,
  user: emptyUser,
  _id: '',
}
