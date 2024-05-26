import React, { useState } from 'react';
import TaskService from '@/services/taskService';

interface FilterProps {
  onTasksFetched: (tasks: any[]) => void;
}

export default function Filter({ onTasksFetched }: FilterProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const data = await TaskService.filterTasks(searchTerm);
      onTasksFetched(data);
    } catch (e) {
      console.error('Failed to fetch tasks:', e);
    };
  };

  return (
    <div className="w-full max-w-sm border border-palette-300 rounded-lg shadow-lg">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Pesquise por id ou palavra-chave..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow bg-palette-50 p-2 border border-palette-300 rounded-l-lg focus:outline-none placeholder-palette-700 text-palette-950"
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-palette-500 border border-palette-300 rounded-r-lg hover:bg-palette-600 transition-colors duration-200"
        >
          <img src="/search.svg" alt="Search Icon" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};