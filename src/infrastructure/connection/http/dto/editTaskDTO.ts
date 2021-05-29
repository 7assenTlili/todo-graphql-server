export interface EditTaskDTO {
  id: string;
  input: {
    title: string;
    description: string;
    isComplete: boolean;
  }
}
