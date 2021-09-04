export interface ICollection {
  id: string;
  name: string;
  schema: Schema;
  fields: number;
  show: boolean;
  operations: OperationsOrPublicMethods;
  publicMethods: OperationsOrPublicMethods;
  x: number;
  y: number;
}
export interface Schema {}

export interface OperationsOrPublicMethods {
  list: boolean;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  deleteAll: boolean;
}

export interface ISchema {
  name: string;
  type: string;
  default: string;
  index: boolean;
  maxLength: number;
  minLength: number;
  required: boolean;
  trim: boolean;
  unique: boolean;
  uppercase: boolean;
  lowercase: boolean;
  ref: string;
  relationship: string;
  enum?: null[] | null;
  autopopulate: boolean;
}
