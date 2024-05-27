import { CreateTaskDTO } from '@/interfaces/CreateTask.dto';
import axios from 'axios';

const baseUrl = 'http://localhost:3000/task';

export default class TaskService {
  static async filterTasks(keyword: string) {
    try {
      const response = await axios.get(`${baseUrl}/filter?search=${keyword}`);
      return response.data;
    } catch (e) {
      console.error('Error fetching data:', e);
      throw e;
    };
  };

  static async createTask(task: CreateTaskDTO) {
    try {
      const response = await axios.post(baseUrl, task);
      return response.data;
    } catch (e) {
      console.error('Error creating task:', e);
      throw e;
    };
  };
  
  static async deleteTask(taskId: number) {
    try {
      await axios.delete(`${baseUrl}/${taskId}`);
    } catch (e) {
      console.error('Error deleting task:', e);
      throw e;
    };
  };
};
