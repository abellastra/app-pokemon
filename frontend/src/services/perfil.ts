export const hayPerfil = async () => {
    try {

        const result = await fetch(`${import.meta.env.VITE_API_URL}me`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
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