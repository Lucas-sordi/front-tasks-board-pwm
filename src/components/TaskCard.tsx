import React from 'react';
import { TaskDTO } from '@/interfaces/Task.dto';

interface TaskCardProps {
  task: TaskDTO;
}

export default function TaskCard({ task }: TaskCardProps) {  
  return (
    <div className="bg-white shadow-lg rounded-md p-4 mb-4">
      <h2 className="text-lg font-semibold text-gray-800">{task.name}</h2>
      <p className="text-sm text-gray-600 mt-2">ID: {task.id}</p>
    </div>
  );
};