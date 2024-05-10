import { useFetch } from "../hooks/useFetch";



const CamposAddPage = () => {
    const {data, loading, error } = useFetch('http://codicedev:8080/ords/saceqsrv/catalogos/datoAdicional');

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
          {data.datos.map((campo) => (
            <li key={campo.id}>
              ID: {campo.id}, Nombre: {campo.nombre}, Tipo: {campo.tipo}, Estatus: {campo.estatus}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CamposAddPage;