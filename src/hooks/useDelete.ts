import { useState } from "react";

const useDeleteRequest = (url: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    console.log(url);

    const deleteResource = async () => {
        setIsLoading(true);
        try {
            const requestOptions = {
                method: "DELETE",
            };

            const response = await fetch(url, requestOptions);

            if (!response.ok) {
                let errorMessage = "Error al eliminar el recurso";
                if (response.status === 400) {
                    try {
                        const errorBody = await response.json();
                        errorMessage = `${errorMessage}: ${errorBody}`;
                        console.log(errorBody);
                    } catch (jsonError) {
                        console.error(
                            "Error al analizar el cuerpo de la respuesta JSON:",
                            jsonError
                        );
                    }
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log("Recurso eliminado exitosamente", data);
            setIsLoading(false);
            setError(null);
            return data;
        } catch (error) {
            console.error("Error:", error);
            if (error instanceof Error) { // Verificación de tipo
                setIsLoading(false);
                setError(error);
            }
            return null;
        }
    };

    return { deleteResource, isLoading, errorD: error };
};

export default useDeleteRequest;
