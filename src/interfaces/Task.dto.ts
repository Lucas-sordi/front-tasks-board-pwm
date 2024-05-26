export interface TaskDTO {
  id: number;
  name: string;
  taskType: TaskTypeDTO;
  subtasks: SubTaskDTO[];
};

interface TaskTypeDTO {
  id: number;
  type: string;
};

interface SubTaskDTO {
  id: number;
  name: string;
  taskType: TaskTypeDTO;
};