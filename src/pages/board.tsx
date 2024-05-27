import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import TaskCard from '@/components/TaskCard';
import Filter from '@/components/Filter';
import { TaskDTO } from '@/interfaces/Task.dto';
import TaskService from '@/services/taskService';
import CreateTaskModal from '@/components/CreateTaskModal';

export default function Board() {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  const handleTasksFetched = (data: TaskDTO[]) => {
    setTasks(data);
  };

  const fetchTasks = async () => {
    try {
      const data = await TaskService.filterTasks('');
      setTasks(data);
    } catch (e) {
      console.error('Failed to fetch tasks:', e);
    };
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDeleteTask = async () => {
    fetchTasks();
  };

  const handleCreateTask = async () => {
    fetchTasks();
  };

  const openCreateTaskModal = () => {
    setIsCreateTaskModalOpen(true);
  };

  const closeCreateTaskModal = () => {
    setIsCreateTaskModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full min-h-screen">
      <Navbar />
      <div className="flex flex-wrap gap-y-1 justify-end p-4 mt-12 md:mr-10 md:ml-10 sm:mr-2 sm:ml-2">
        <button
          onClick={openCreateTaskModal}
          className="px-4 py-2 bg-palette-500 text-palette-100 rounded-lg border border-palette-400 hover:bg-palette-600 hover:scale-101 md:mr-4 sm:mr-2"
        >
          Criar Task Raiz
        </button>
        <Filter onTasksFetched={handleTasksFetched} />
      </div>
      <div className="flex flex-col flex-grow items-center justify-center">
        <div className="mt-8">
          {tasks.length > 0 ? (
            tasks.map((task: TaskDTO, index) => (
              <TaskCard task={task} key={index} onDeleteTask={handleDeleteTask} />
            ))
          ) : (
            <div className="flex flex-col flex-grow items-center justify-center p-24">
              <p className="mt-4 text-lg text-palette-900">
                Nenhuma task encontrada.
              </p>
            </div>
          )}
        </div>
      </div>
      <CreateTaskModal isOpen={isCreateTaskModalOpen} onClose={closeCreateTaskModal} onCreate={handleCreateTask} />
    </div>
  );
};
