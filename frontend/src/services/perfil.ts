export const hayPerfil = async () => {
try {
    
    const result = await fetch('http://localhost:3000/me',
        { method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            },
          credentials:'include'
        }
    )
    const resultado = await result.json()
        if (!result.ok) {
            throw new Error(resultado.message);

        }
    return result.ok
    
} catch (error) {
    console.error("Error al buscar usuario:", error);
    throw error
}
}