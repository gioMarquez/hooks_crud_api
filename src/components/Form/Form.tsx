const Form = () => {
	return (
		<div>
			<h1 className="text-2xl pt-3">Oficinas Recaudadoras</h1>
			<div className="text-xl m-2 grid grid-cols-3">
				<input
					type="text"
					placeholder="Nombre"
					className="border border-green-600 m-2"
				/>
				<input
					type="text"
					placeholder="Horario"
					className="border border-green-600 m-2"
				/>
				<input
					type="text"
					placeholder="latitud"
					className="border border-green-600 m-2"
				/>
				<input
					type="text"
					placeholder="longitud"
					className="border border-green-600 m-2"
				/>
				<select
					name="estatus"
					id="estatus"
					className="bg-blue-900 text-white rounded-xl"
				>
					<option value="1">Selecionar</option>
					<option value="2">Activo</option>
					<option value="3">Inactivo</option>
				</select>
				<div className="col-span-3 bg-green-400 rounded-3xl p-1 w-[200px] place-self-center mt-2 text-center hover:bg-green-800 hover:text-white">
					<button>Enviar</button>
				</div>
			</div>
		</div>
	);
};

export default Form;
