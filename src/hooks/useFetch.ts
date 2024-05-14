import { useState, useEffect } from "react";

interface Response {
	estado: string;
	codigo: number;
	mensaje: string | null;
	datos:  OficinasRecau[] | CamposAd[];
	total: number;
	page_size: number;
	rows: string;
}

export interface CamposAd {
    id: number;
    nombre: string;
    tipo: string;
    estatus: string;
}

export interface OficinasRecau {
    id: number;
    nombre: string;
    horario: string;
    latitud: string;
    longitud: string;
    estatus: number;
}



export function useFetch(url: string) {
	const [data, setData] = useState<Response | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error("No se pudo obtener la información");
				}
				const jsonData = await response.json();
				setData(jsonData);
			} catch (error: unknown) {
				setError(error as Error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);

	return { data, loading, error };
}


// export function useDelete(url: string) {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<Error | null>(null);
  
//     const deleteData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(url, {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json',
//             // Puedes agregar cualquier otra cabecera necesaria aquí
//           },
//         });
//         if (!response.ok) {
//           throw new Error('No se pudo eliminar la información');
//         }
//       } catch (error) {
//         setError(error as Error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     return { deleteData, loading, error };
//   }


