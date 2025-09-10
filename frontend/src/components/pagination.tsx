import { useEffect } from 'react';
import ReturnPaginationRange from '../utils/appUtils';

interface PaginationProps {
  totalPaginas: number;
  paginaActual: number;
  siblings: number;
  cambiar: (value: number) => void;
}

function Pagination({ totalPaginas, paginaActual, siblings, cambiar }: PaginationProps) {
  const arrayItemsPag = ReturnPaginationRange(totalPaginas, paginaActual, siblings);

  useEffect(() => {
    cambiar(paginaActual);
  }, []);

  return (
    <div className='w-full flex justify-center px-2  sm:px-6'>
      <nav
        aria-label='Pagination'
        className='flex flex-wrap gap-1 sm:gap-2 items-center justify-center bg-sky-200 p-2 rounded-md ring-1 ring-white/10'
      >
        {/* Botón anterior con ícono */}
        <button
          onClick={() => paginaActual > 1 && cambiar(paginaActual - 1)}
          className='inline-flex items-center px-2 py-2 rounded-md ring-1 ring-gray-700 text-white hover:bg-white/10 focus:outline-none'
        >
          <svg viewBox='0 0 20 20' fill='currentColor' className='w-5 h-5'>
            <path d='M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z' />
          </svg>
        </button>

        {/* Números de página */}
        {arrayItemsPag.map((value, index) => (
          <button
            key={`${value}-${index}`}
            className={`px-3 py-1 text-sm font-semibold ring-1 ring-gray-700 rounded-md ${
              value === paginaActual
                ? 'bg-gray-700 text-white'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {value}
          </button>
        ))}

        {/* Botón siguiente con ícono */}
        <button
          onClick={() => paginaActual < totalPaginas && cambiar(paginaActual + 1)}
          className='inline-flex items-center px-2 py-2 rounded-md ring-1 ring-gray-700 text-white hover:bg-white/10 focus:outline-none'
        >
          <svg viewBox='0 0 20 20' fill='currentColor' className='w-5 h-5'>
            <path d='M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z' />
          </svg>
        </button>
      </nav>
    </div>
  );
}

export default Pagination;