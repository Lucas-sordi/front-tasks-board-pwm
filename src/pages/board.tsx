import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Filter from '../components/Filter';
import { TaskDTO } from '@/interfaces/Task.dto';

export default function Board() {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);

  const handleTasksFetched = (data: TaskDTO[]) => {
    setTasks(data);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex justify-end p-4 mt-12 md:mr-10 md:ml-10 sm:mr-2 sm:ml-2">
        <Filter onTasksFetched={handleTasksFetched} />
      </div>
      <div className="flex flex-col flex-grow items-center justify-center">
        <div className="mt-8">
          {tasks.length > 0 ? (
            tasks.map((task: TaskDTO, index) => (
              <div key={index} className="text-palette-950">
                {task.id} - {task.name}
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
