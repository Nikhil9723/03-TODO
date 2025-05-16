export type EventType =
  | React.MouseEvent<HTMLButtonElement>
  | React.KeyboardEvent<HTMLInputElement>;

export interface EditTodoId {
  [id: string]: string;
}
