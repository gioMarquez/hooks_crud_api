import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { OficinasRecau, CamposAd } from "../hooks/useFetch";
import useDeleteRequest from "../hooks/useDelete";

const OfiRecaudPage = () => {
	const URL = "http://codicedev:8080/ords/saceqsrv/fichaTecnica/oficinaRecaudadora/";

  const [errorMessage, setErrorMessage] = useState('');
	const [inputValue, setInputValue] = useState<number>();
	const { deleteResource, isLoading, errorD } = useDeleteRequest( URL + inputValue );
  // console.log(URL + inputValue)

  const handleDelete = async () => {
    try {
      await deleteResource();
      // Aquí puedes realizar cualquier acción adicional después de eliminar el recurso
    } catch (errorE) {
      setErrorMessage('Error al eliminar el recurso. Por favor, inténtelo de nuevo más tarde.');
    }
  };


	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(Number(e.target.value));
	};

	const { data, loading, error } = useFetch(
		"http://codicedev:8080/ords/saceqsrv/fichaTecnica/oficinaRecaudadora?pagina=0"
	);

	return (
		<div>
			<div className="grid grid-cols-4">
				<input
					type="number"
					name="Eliminar"
					className="bg-black text-white text-2xl  p-2  w-[300px] "
					onChange={handleInputChange}
				/>
				<div className="col-span-3">
        {isLoading && <p className="text-3xl">Eliminando recurso...</p>}
				{errorMessage && <p>{errorMessage}</p>}
					<button
						className="bg-blue-600 text-white text-3xl px-10 py-2 rounded-2xl  ml-4"
						onClick={() => handleDelete()}
						disabled={loading}
					>
						{loading ? "Eliminando..." : "Eliminar"}
					</button>
					{error && <div>Error: {error.message}</div>}
				</div>
			</div>
			<h1 className="pt-3">Datos de la API:</h1>
			{data && (
				<ul>
					{data.datos.map((item) => (
						<li key={item.id}>
							{isOficinasRecau(item) ? (
								<>
									ID: {item.id}, Nombre: {item.nombre},
									Horario: {item.horario}, Latitud:{" "}
									{item.latitud}, Longitud: {item.longitud},
									Estatus: {item.estatus}
								</>
							) : (
								<>
									ID: {item.id}, Nombre: {item.nombre}, Tipo:{" "}
									{item.tipo}, Estatus: {item.estatus}
								</>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

const isOficinasRecau = (
	item: OficinasRecau | CamposAd
): item is OficinasRecau => {
	return "horario" in item;
};

export default OfiRecaudPage;
