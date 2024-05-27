export interface TaskDetailedDTO {
  id: number;
  name: string;
  description: string;
  taskType: TaskTypeDTO;
  subtasks: SubTaskDTO[];
  createdAt: string;
  updatedAt: string;
}

interface TaskTypeDTO {
  id: number;
  type: string;
};

interface SubTaskDTO {
  id: number;
  name: string;
  taskType: TaskTypeDTO;
};