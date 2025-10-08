import { toast } from "react-hot-toast";
let toastMostrado = false;
export async function requestConCookie(url: string, opciones: RequestInit = {}) {
    const response = await fetch(url, {
        ...opciones,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(opciones.headers || {}),
        },
    });

    if (response.status === 401) {
        localStorage.clear();
        
        if (!toastMostrado) {
            toast.error("Tu sesión ha expirado");
            toastMostrado = true;
            setTimeout(() => {
                window.location.href = "/login";

            }, 2000);
        }
    }

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error desconocido");
    }
    return response.json();
}
