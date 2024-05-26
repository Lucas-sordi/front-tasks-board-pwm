import React, { useState, useEffect, useRef } from 'react';
import { TaskDTO } from '@/interfaces/Task.dto';

interface TaskCardProps {
  task: TaskDTO;
}

export default function TaskCard({ task }: TaskCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative bg-palette-50 shadow-lg rounded-md p-4 mb-4 border-l-8 border-palette-700 hover:scale-1005 cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="text-lg font-bold text-palette-950 mr-2">{task.id} -</p>
          <h2 className="text-lg font-semibold text-palette-800">{task.name}</h2>
        </div>
        <div className="relative hover:bg-palette-200 rounded-md md:ml-2" ref={menuRef}>
          <img
            src="/ellipsis.svg"
            alt="Menu Icon"
            className="w-4 h-4 cursor-pointer"
            onClick={toggleMenu}
          />
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-palette-50 border rounded-md shadow-lg z-10">
              <div className="flex items-center p-2 hover:bg-palette-100 cursor-pointer">
                <img src="/open.svg" alt="Open Icon" className="w-4 h-4 mr-2" />
                <span>Abrir</span>
              </div>
              <div className="flex items-center p-2 hover:bg-palette-100 cursor-pointer">
                <img src="/delete.svg" alt="Delete Icon" className="w-4 h-4 mr-2" />
                <span>Excluir</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="text-xs text-palette-300 mt-2">Parent</p>
      <div className="flex items-center mt-2">
        <img src="/tag.svg" alt="Tag Icon" className="w-3 h-3 mr-1" />
        <p className="text-sm text-palette-500">{task.taskType.type}</p>
      </div>
      <img
        src="/add.svg"
        alt="Add Icon"
        className="absolute right-4 bottom-4 w-4 h-4 cursor-pointer hover:bg-palette-200 rounded-md md:ml-2"
      />
    </div>
  );
}
