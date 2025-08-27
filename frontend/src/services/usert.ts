type user = {
    password:string;
    email:string;
}
export async function crearSolicitudUsuario(dataUser:user){
    try{
            const respuesta = await fetch(`http://localhost:3000/crear-user`,{
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: dataUser.email,
                    password:dataUser.password
                    
                })
            })
            const resultado = await respuesta.json()
            if (!resultado.ok) {
                throw new Error("No se encontro un usuario");
            }else{
                console.log('user creado')
            }
    } catch (error) {
    console.error("Error al crear usuario:", error);
    }
}