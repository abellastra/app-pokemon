// Genera un array de números desde "inicio" hasta "fin"
const generarRango = (inicio: number, fin: number): number[] => {
  return Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i);
}

function devolverRangoDePaginacion(
  totalPaginas: number,   
  paginaActual: number,  
  hermanos: number        
) {
   
  if (totalPaginas <= 7) {
    // Si hay pocas páginas, muestro todas
    return generarRango(1, totalPaginas);
  }

  if (paginaActual <= 1 + hermanos * 2) {
    // Cerca del inicio
    const rangoIzquierda = generarRango(1, 3 + hermanos * 2);
    return [...rangoIzquierda, totalPaginas];
  }

  if (paginaActual >= totalPaginas - hermanos * 2) {
    // Cerca del final
    const rangoDerecha = generarRango(totalPaginas - (2 + hermanos * 2), totalPaginas);
    return [1, ...rangoDerecha];
  }

  // En el medio
  const rangoMedio = generarRango(paginaActual - hermanos, paginaActual + hermanos);
  return [1, ...rangoMedio,  totalPaginas];
}


export default devolverRangoDePaginacion;
