import axios from 'axios';

const baseUrl = 'http://localhost:3000/task-type';

export default class TaskTypeService {
  static async getTaskTypes() {
    try {
      const response = await axios.get(`${baseUrl}`);
      return response.data;
    } catch (e) {
      console.error('Error fetching data:', e);
      throw e;
    };
  };
};
