import { Injectable } from '@angular/core';
import { ExpressionCard, UserKanjiCard } from 'src/app/study/models/card.model';
import { DataType } from 'src/app/shared/models/custom-types.model';
import { Expression } from 'src/app/study/models/expression.model';
import { UserKanji } from 'src/app/study/models/user-kanji.model';

@Injectable({
  providedIn: 'root'
})
export class ExpressionCardService {

  constructor() { }

  generateCardData(type: DataType, reviewData: Expression | UserKanji): ExpressionCard | UserKanjiCard {
    if (type === 'expression') {
      const data = reviewData as Expression;
      const expressionCard: ExpressionCard = {
        main: data.word,
        hint: data.exampleSentences.map(e => e.sentence)[0],
        reading: data.reading,
        englishMeaning: data.englishMeaning,
        japaneseMeaning: data.japaneseMeaning,
        exampleSentences: data.exampleSentences.map(e => e.sentence),
        transitivity: data.transitivity,
        jlpt: data.jlpt,
        difficulty: data.difficulty,
        _id: data._id
      }
      return expressionCard;
    } else {
      const data = reviewData as UserKanji;
      const userKanjiCard: UserKanjiCard = {
        main: data.kanji.kanji,
        hint: data.expressions.map(e => e.word)[0],
        onReadings: data.kanji.on_readings,
        kunReadings: data.kanji.kun_readings,
        meanings: data.kanji.meanings,
        expressions: data.expressions.map(e => ({ word: e.word, reading: e.reading })),
        jlpt: data.kanji.jlpt,
        difficulty: data.difficulty,
        _id: data._id
      }
      return userKanjiCard;
    }
  }
}
