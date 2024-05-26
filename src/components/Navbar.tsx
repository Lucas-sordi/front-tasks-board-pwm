import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-palette-950 p-4 flex justify-between items-center rounded-sm shadow-2xl ">
      <Link href="/">
        <h1 className="text-palette-100 text-3xl md:ml-20 transition-transform hover:scale-125 cursor-pointer">Board</h1>
      </Link>
      <div className="md:mr-20">
        <Link href="/board">
          <span className="text-palette-100 px-4 py-3 border border-transparent rounded-lg transition cursor-pointer hover:border-palette-50">Acessar board</span>
        </Link>
        <Link href="/about">
          <span className="text-palette-100 px-4 py-2 md:ml-4 border border-transparent rounded-lg transition cursor-pointer hover:border-palette-50">Sobre</span>
        </Link>
      </div>
    </nav>
  );
};