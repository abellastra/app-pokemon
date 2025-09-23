import { createContext, useContext, useState, useEffect, Children } from 'react';

type temaContextType = {
  tema: 'claro' | 'oscuro';
  setTema: (t: 'claro' | 'oscuro') => void;
 
};
const TemaContext = createContext<temaContextType | null>(null);
export const TemaProvider=({children}:{children:React.ReactNode})=>{
    const [tema, setTema] = useState<'claro' | 'oscuro'>('claro');
      const temaGuardado = localStorage.getItem('tema');

    useEffect(()=>{
        if (temaGuardado === 'oscuro' || temaGuardado === 'claro') {
          setTema(temaGuardado);
        }  
    },[])

    useEffect(()=>{
localStorage.setItem('tema',tema)
console.log(tema)
    },[tema]);
    return(

<TemaContext.Provider value={{setTema,tema}}>
    {children}
</TemaContext.Provider>    )
}

export const useTema= ()=>{
    const contexto = useContext(TemaContext)
     if (!contexto) {
       throw new Error('useTema debe usarse dentro de TemaProvider');
     }
    return contexto
}