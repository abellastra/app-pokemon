import ReturnPaginationRange from '../utils/appUtils';

interface PaginationProps {
  totalPaginas: number;
  paginaActual: number;
  siblings: number;
  cambiar: (value: number) => void;
  tema: string;
}

function Pagination({ totalPaginas, paginaActual, siblings, cambiar, tema }: PaginationProps) {
  const arrayItemsPag = ReturnPaginationRange(totalPaginas, paginaActual, siblings);

  return (
    <div className=' flex justify-center '>
      <nav
        aria-label='Pagination'
        className='flex items-center justify-center p-2   h-[33px]'
      >
        <div className={`text-sm flex items-center gap-2  h-8 rounded-full ${tema === 'oscuro' ? 'bg-[#FFFFFF1A]': 'bg-blue-200'}`}>
          {/* Botón anterior con ícono */}
          <div className='flex pr-1'>
            <button
              onClick={() => paginaActual > 1 && cambiar(paginaActual - 1)}
              className={`w-[38px] h-[34px] rounded-full bg-[#8b8888] text-white flex items-center justify-center ${tema === 'oscuro' ? 'bg-[#FFFFFF1A]': 'bg-blue-300'}`} 
            >
              <svg viewBox='0 0 20 20' fill='currentColor' className='w-5 h-5'>
                <path d='M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z' />
              </svg>
            </button>
          </div>


          {/* Números de página */}
          {arrayItemsPag.map((value, index) => (
            <button
              key={`${value}-${index}`}
              onClick={() => cambiar(Number(value))}
              className={`text-sm font-semibold rounded-full w-[22px] h-[22px] flex items-center justify-center cursor-pointer pt-1 pr-2 pb-1 pl-2   ${value === paginaActual
                ? 'bg-[#013479CC] text-white'
                : 'text-white hover:bg-white/10'
                }`}
            >
              {value}
            </button>
          ))}

          {/* Botón siguiente con ícono */}
          <div className='flex pl-1'>
            <button
              onClick={() =>
                paginaActual < totalPaginas && cambiar(paginaActual + 1)
              }
              className={`w-[38px] h-[34px] rounded-full bg-[#8b8888] text-white flex items-center justify-center ${tema === 'oscuro' ? 'bg-[#FFFFFF1A]': 'bg-blue-300'}`} 
            >
              <svg viewBox='0 0 20 20' fill='currentColor' className='w-5 h-5 '>
                <path d='M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z' />
              </svg>
            </button>
          </div>

        </div>
      </nav>
    </div>
  );
}

export default Pagination;