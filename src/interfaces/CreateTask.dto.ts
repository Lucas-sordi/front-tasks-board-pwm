export interface CreateTaskDTO {
  name: string;
  description: string;
  parentId?: number;
  typeId: number;
};