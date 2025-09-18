import { createContext,useState,useContext, useEffect } from "react";
import type { ReactNode } from 'react';

type AuthContextType={
    perfil:boolean;
    setPerfil:(estado:boolean)=>void
    userName:string;
    setUserName:(estado:string)=>void

}

const AuthContext= createContext<AuthContextType|null>(null);


export const AuthPrivider=({children}:{children:ReactNode})=>{
    const [perfil,setPerfil]=useState(false)

    const [userName,setUserName]=useState('')
    useEffect(() => {
      const nombreGuardado = localStorage.getItem('userName');
      if (nombreGuardado) {
        setUserName(nombreGuardado);
        setPerfil(true);
      }
    }, []);
    // useEffect(()=>{

    // },[userName])

    return(
        <AuthContext.Provider value={{perfil,setPerfil,userName,setUserName}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth=()=>{
    const context= useContext(AuthContext)
      if (!context)
        throw new Error('no context');
    return context;
}