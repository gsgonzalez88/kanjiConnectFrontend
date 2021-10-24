import { DataType, Difficulty, Jlpt, Transitivity } from "./custom-types.model";

export interface CardFilter {
  user: string;
  type?: DataType;
  lesson?: string;
  source?: string;
  tags?: string[];
  jlpt?: Jlpt;
  difficulty?: Difficulty;
  transitivity?: Transitivity;
}
