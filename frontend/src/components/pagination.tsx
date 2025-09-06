import { useEffect } from 'react';
import ReturnPaginationRange from '../utils/appUtils';
interface PaginationProps {
  totalPaginas: number;
  paginaActual: number;
  siblings: number;
  cambiar: (value: number) => void;
}

function Pagination(props: PaginationProps) {
  console.log(props.totalPaginas)
  const arrayItemsPag = ReturnPaginationRange(
    props.totalPaginas,
    props.paginaActual,
    props.siblings
  );

  useEffect(() => {
    props.cambiar(props.paginaActual);
  }, []);
  return (
    <div>
      <div className='flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6'>
        <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
          <div>
            <nav
              aria-label='Pagination'
              className='isolate inline-flex -space-x-px rounded-md'
            >
              <a
                href='#'
                className='relative inline-flex items-center rounded-l-md px-2 py-2 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0'
              >
                <span className='sr-only'>Previous</span>
                <svg
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  data-slot='icon'
                  aria-hidden='true'
                  className='size-5'
                >
                  <path d='M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z' />
                </svg>
              </a>

              <a
                href='#'
                className='relative inline-flex items-center  px-2 py-2 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0'
                onClick={e => {
                  e.preventDefault();
                  if (props.paginaActual > 1) {
                    props.cambiar(props.paginaActual - 1);
                  }
                }}
              >
                Previous
              </a>

              {arrayItemsPag.map((value, index) => {
                if (value === props.paginaActual) {
                  return (
                    <a
                      href='#'
                      key={`${value}-${index}`}
                      className='relative hidden items-center px-4 py-2 text-sm font-semibold inset-ring inset-ring-gray-700 text-white hover:bg-white/5 focus:z-20 focus:outline-offset-0 md:inline-flex bg-gray-700'
                      onClick={() => props.cambiar(value)}
                    >
                      {value}
                    </a>
                  );
                } else {
                  return (
                    <a
                      href='#'
                      key={`${value}-${index}`}
                      className='relative hidden items-center px-4 py-2 text-sm font-semibold inset-ring inset-ring-gray-700  text-white hover:bg-white/5 focus:z-20 focus:outline-offset-0 md:inline-flex'
                      onClick={() => props.cambiar(Number(value))}
                    >
                      {value}
                    </a>
                  );
                }
              })}
              <a
                href='#'
                className='relative inline-flex items-center  px-2 py-2 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0'
                onClick={e => {
                  e.preventDefault();
                  if (props.paginaActual < props.totalPaginas) {
                    props.cambiar(props.paginaActual + 1);
                  }
                }}
              >
                Next
              </a>

              <a
                href='#'
                className='relative inline-flex items-center rounded-r-md px-2 py-2 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0'
              >
                <span className='sr-only'>Next</span>
                <svg
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  data-slot='icon'
                  aria-hidden='true'
                  className='size-5'
                >
                  <path d='M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z' />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Pagination;
