import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import TaskCard from '@/components/TaskCard';
import Filter from '@/components/Filter';
import { TaskDTO } from '@/interfaces/Task.dto';
import TaskService from '@/services/taskService';

export default function Board() {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);

  const handleTasksFetched = (data: TaskDTO[]) => {
    setTasks(data);
  };
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await TaskService.filterTasks('');
        setTasks(data);
      } catch (e) {
        console.error('Failed to fetch tasks:', e);
      };
    };

    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col h-full min-h-screen">
      <Navbar />
      <div className="flex justify-end p-4 mt-12 md:mr-10 md:ml-10 sm:mr-2 sm:ml-2">
        <Filter onTasksFetched={handleTasksFetched} />
      </div>
      <div className="flex flex-col flex-grow items-center justify-center">
        <div className="mt-8">
          {tasks.length > 0 ? (
            tasks.map((task: TaskDTO, index) => (
              <TaskCard task={task} key={index}  />
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
