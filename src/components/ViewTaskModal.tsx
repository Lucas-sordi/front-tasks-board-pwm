import React, { useState, useEffect, useRef } from 'react';
import TaskTypeService from '@/services/taskTypeService';
import TaskService from '@/services/taskService';
import { TaskDetailedDTO } from '@/interfaces/TaskDetailed.dto';

interface ViewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
  taskId: number;
}

export default function ViewTaskModal({ isOpen, onClose, onUpdate, taskId }: ViewTaskModalProps) {
  const [task, setTask] = useState<TaskDetailedDTO | null>(null);
  const [taskTypes, setTaskTypes] = useState([]);
  const [currentTaskName, setCurrentTaskName] = useState<string>('');
  const modalRef = useRef<HTMLDivElement>(null);
    
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const data = await TaskService.getTaskDetails(taskId);
        setTask(data);
        setCurrentTaskName(data.name);
      } catch (e) {
        console.error('Error fetching task details:', e);
      }
    };

    const fetchTaskTypes = async () => {
      try {
        const types = await TaskTypeService.getTaskTypes();
        setTaskTypes(types);
      } catch (e) {
        console.error('Error fetching task types:', e);
      }
    };

    if (isOpen) {
      fetchTaskDetails();
      fetchTaskTypes();
    }
  }, [isOpen, taskId]);

  const handleUpdateTask = async () => {
    try {
      if (task) {
        await TaskService.updateTask(taskId, {
          name: task.name,
          description: task.description,
          parentId: undefined,
          typeId: task.taskType.id,
        });

        onUpdate();
        onClose();
      }
    } catch (e) {
      console.error('Error updating task:', e);
    }
  };

  const handleClose = () => {
    setTask(null);
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div ref={modalRef} className="bg-palette-100 p-8 rounded-2xl shadow-xl w-11/12 md:w-2/5 h-4/5 md:h-3/5 flex flex-col relative overflow-auto max-w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{taskId} - {currentTaskName}</h2>
          <button onClick={handleClose} className="w-6 h-6">
            <img src="/x-mark.svg" alt="Close Icon" className="w-full h-full" />
          </button>
        </div>
        <div className="flex flex-wrap mb-4 gap-4">
          <div className="grow">
            <label className="block text-palette-700">Título</label>
            <input
              type="text"
              value={task.name}
              onChange={(e) => setTask({ ...task, name: e.target.value })}
              className="block w-full border border-palette-300 p-2 rounded mt-1 focus:outline-none text-sm focus:border-palette-700"
            />
          </div>
          <div>
            <label className="block text-palette-700">Tipo de Task</label>
            <select
              value={task.taskType.id || ''}
              onChange={(e) => { setTask({ ...task, taskType: { ...task.taskType, id: Number(e.target.value) } }) }}
              className={"w-full border border-palette-300 p-2 text-sm rounded mt-1 focus:outline-none focus:border-palette-700"}>
              {taskTypes.map((type: any) => (
                <option key={type.id} value={type.id}>
                  {type.type}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-12 flex-grow">
          <label className="block text-palette-700">Descrição</label>
          <textarea
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className="w-full h-full border border-palette-300 p-2 resize-none rounded mt-1 text-sm focus:outline-none focus:border-palette-700"
          />
        </div>
        <div className="flex justify-end">
          <label className="inline-block text-palette-500 text-sm">Data de Criação: {new Date(task.createdAt).toLocaleString()}</label>
        </div>
        <div className="mb-8 flex justify-end">
          <label className="inline-block text-palette-500 text-sm">Última Atualização: {new Date(task.updatedAt).toLocaleString()}</label>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-paletteRed-800 text-palette-100 rounded-xl hover:bg-paletteRed-900"
          >
            Cancelar
          </button>
          <button
            onClick={handleUpdateTask}
            className="px-4 py-2 bg-palette-500 text-palette-100 rounded-xl hover:bg-palette-600"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
