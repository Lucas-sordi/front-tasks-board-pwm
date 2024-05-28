import React from 'react';
import Navbar from '../components/Navbar';

export default function About() {
  return (
    <div className="flex flex-col h-full min-h-screen">
      <Navbar />
      <div className="flex flex-col flex-grow items-center  p-24">
        <h1 className="text-4xl font-bold text-palette-950">Sobre</h1>
        <p className="mt-4 text-lg text-palette-950">
          Trabalho desenvolvido para a disciplina de Programação Web e Mobile.
        </p>
      </div>
    </div>
  );
};