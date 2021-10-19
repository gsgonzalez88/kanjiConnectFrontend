export interface Lesson {
  user:  string;
  date: Date;
  topic: string;
  link: string;
  _id: string;
}

export const emptyLesson: Lesson = {
  user:  '',
  date: new Date,
  topic: '',
  link: '',
  _id: '',
}

export const loadingLesson: Lesson = {
  ...emptyLesson,
  topic: 'Loading...'
}
