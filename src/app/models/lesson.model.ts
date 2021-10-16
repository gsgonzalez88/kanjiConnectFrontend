export interface Lesson {
  user:  string;
  date: Date;
  topic: string;
  link: string;
  _id: string;
}

export const EmptyLesson: Lesson = {
  user:  '',
  date: new Date,
  topic: '',
  link: '',
  _id: '',
}
