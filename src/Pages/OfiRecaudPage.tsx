import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { OficinasRecau, CamposAd } from "../hooks/useFetch";
import useDeleteRequest from "../hooks/useDelete";
import Modal from "../components/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";

const OfiRecaudPage = () => {

	const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()
	const URL =
		"http://codicedev:8080/ords/saceqsrv/fichaTecnica/oficinaRecaudadora/";

		const [isModalOpen, setIsModalOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [inputValue, setInputValue] = useState<number>();
	const { deleteResource, isLoading, errorD } = useDeleteRequest(
		URL + inputValue
	);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleDelete = async () => {
		try {
			await deleteResource();
		} catch (errorD) {
			setErrorMessage(
				"Error al eliminar el recurso. Por favor, inténtelo de nuevo más tarde."
			);
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

			<h1 className="text-7xl">This is the value of count Global variable: {count}</h1>

			<div>
				<button onClick={openModal}>Crear</button>
				<Modal
					isOpen={isModalOpen}
					onClose={closeModal}
				/>
			</div>


			<div className="grid grid-cols-4">
				<input
					type="number"
					name="Eliminar"
					className="bg-black text-white text-2xl  p-2  w-[300px] "
					onChange={handleInputChange}
				/>
				<div className="col-span-3">
					{isLoading && (
						<p className="text-3xl">Eliminando recurso...</p>
					)}
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
