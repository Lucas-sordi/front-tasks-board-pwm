import React, { useState, useEffect, useRef } from 'react';
import TaskTypeService from '@/services/taskTypeService';
import TaskService from '@/services/taskService';
import { CreateTaskDTO } from '@/interfaces/CreateTask.dto';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
}

export default function CreateTaskModal({ isOpen, onClose, onCreate }: CreateTaskModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [typeId, setTypeId] = useState<number | null>(null);
  const [taskTypes, setTaskTypes] = useState([]);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTaskTypes = async () => {
      try {
        const types = await TaskTypeService.getTaskTypes();
        setTaskTypes(types);
      } catch (e) {
        console.error('Error fetching task types:', e);
      }
    };
    fetchTaskTypes();
  }, []);

  const handleCreateTask = async () => {
    if (typeId === null) return;

    const newTask: CreateTaskDTO = {
      name,
      description,
      parentId: undefined,
      typeId,
    };

    try {
      await TaskService.createTask(newTask);
      onCreate();
      onClose();
    } catch (e) {
      console.error('Error creating task:', e);
    }
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setTypeId(null);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setName('');
      setDescription('');
      setTypeId(null);
    }
  }, [isOpen]);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div ref={modalRef} className="bg-palette-100 p-6 rounded-2xl shadow-xl w-96 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Criar Task</h2>
          <button onClick={handleClose} className="w-6 h-6">
            <img src="/x-mark.svg" alt="Close Icon" className="w-full h-full" />
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-palette-700">Título</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-palette-300 p-2 rounded mt-1 focus:outline-none text-sm focus:border-palette-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-palette-700">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-palette-300 p-2 resize-none rounded mt-1 text-sm focus:outline-none focus:border-palette-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-palette-700">Tipo de Task</label>
          <select
            value={typeId || ''}
            onChange={(e) => setTypeId(Number(e.target.value))}
            className="w-full border border-palette-300 p-2 text-sm rounded mt-1 focus:outline-none focus:border-palette-700"
          >
            <option value="" disabled>Selecione o tipo</option>
            {taskTypes.map((type: any) => (
              <option key={type.id} value={type.id}>
                {type.type}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-paletteRed-800 text-palette-100 rounded-xl mr-2 hover:bg-paletteRed-900"
          >
            Cancelar
          </button>
          <button
            onClick={handleCreateTask}
            className="px-4 py-2 bg-palette-500 text-palette-100 rounded-xl hover:bg-palette-600"
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  );
}
