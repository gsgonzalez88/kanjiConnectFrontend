import { emptySource, Source } from "./source.model"

export interface Lesson {
  user:  string;
  date: Date;
  topic: string;
  link: string;
  sources: Source[];
  _id: string;
}

export const emptyLesson: Lesson = {
  user:  '',
  date: new Date,
  topic: '',
  link: '',
  sources: [emptySource],
  _id: '',
}

export const loadingLesson: Lesson = {
  ...emptyLesson,
  topic: 'Loading...'
}
