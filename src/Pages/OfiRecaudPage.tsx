import { useState } from "react";
import { useFetch, useDelete } from "../hooks/useFetch";

// interface Row {
//   id: number;
//   nombre: string;
//   horario: string;
//   latitud: string;
//   longitud: string;
//   estatus: number;
// }



const OfiRecaudPage = () => {
  const [inputValue, setInputValue] = useState<number>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(e.target.value)); // Actualizar el estado con el valor del input
  };

  
  const {data, loading, error } = useFetch('http://codicedev:8080/ords/saceqsrv/fichaTecnica/oficinaRecaudadora?pagina=0');
  const handleDeleteClick = () => {
    if (inputValue) {
      useDelete(`http://codicedev:8080/ords/saceqsrv/fichaTecnica/oficinaRecaudadora/${inputValue}`);
    }
  };
  const { deleteData } = useDelete();

     // Verifica si la carga está en curso
  if (loading) return <p>Cargando...</p>;
  
  // Verifica si hubo un error
  if (error) return <p>Hubo un error: {error.message}</p>;
  return (
		<div>
			<h1>Datos de la API:</h1>
			{data && (
				<ul>
					{/* Itera sobre los datos y muestra cada elemento */}
					{data.datos.map((oficina) => (
						<li key={oficina.id}>
							ID: {oficina.id}, 
              Nombre: {oficina.nombre}, 
              Horario: {oficina.horario},
              Latitud: {oficina.latitud},
							Longitud: {oficina.longitud}, 
              Estatus: {oficina.estatus}
						</li>
					))}
				</ul>
			)}
			<input
				type="number"
				name="Eliminar"
				className="bg-black text-white text-2xl m-4 p-2  w-[300px]"
        onChange={handleInputChange}
			/>
			<button 
        className="bg-red-800 px-4 w-[200px] h-[40px] text-white "
        onClick={+}
      >
				Eliminar registro
			</button>
		</div>
  );
}

export default OfiRecaudPage;