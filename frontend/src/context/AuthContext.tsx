import { createContext,useState,useContext } from "react";
import type { ReactNode } from 'react';

type AutContextType={
    perfil:boolean;
    setPerfil:(estado:boolean)=>void
}

const AuthContext= createContext<AutContextType|null>(null);


export const AuthPrivider=({children}:{children:ReactNode})=>{
    const [perfil,setPerfil]=useState(()=>{
        const token= localStorage.getItem('token')
        console.log(token)
        return !!token
    })


    return(
        <AuthContext.Provider value={{perfil,setPerfil}}>
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