import { DataType } from "./custom-types.model";

export interface CardFilter {
  user: string;
  type?: DataType;
  lesson?: string;
  tags?: string[];
}
