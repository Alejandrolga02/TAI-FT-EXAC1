document.getElementById("btnLimpiar").addEventListener("click", (e) => {
	e.preventDefault();

	try {
		document.getElementById("tabla").classList.add("d-none");
		document.getElementById("resultado").innerHTML = "";
		document.getElementById("promedioGeneral").innerText = "";
	} catch (error) {
		console.error(error);
	}
});

document.getElementById("btnMostrar").addEventListener("click", async (e) => {
	e.preventDefault();

	try {
		let respuesta = await axios.get("../alumnos.json");
		mostrarDatos(respuesta.data);
	} catch (error) {
		console.error(error);
	}
});

const mostrarDatos = (data) => {
	let fragment = document.createDocumentFragment();
	let promedioGeneral = 0;

	for (let i = 0; i < data.length; i++) {
		let promedio = (data[i].matematicas + data[i].quimica + data[i].fisica + data[i].geografia) / 4;
		promedioGeneral += promedio;

		let tr = document.createElement("tr");
		tr.innerHTML += `<td>${data[i].id}</td>
			<td>${data[i].matricula}</td>
			<td>${data[i].nombre}</td>
			<td>${data[i].matematicas}</td>
			<td>${data[i].quimica}</td>
			<td>${data[i].fisica}</td>
			<td>${data[i].geografia}</td>
			<td>${promedio}</td>`;
		fragment.appendChild(tr);
	}

	promedioGeneral /= data.length;
	document.getElementById("promedioGeneral").innerText = promedioGeneral.toFixed(2);
	document.getElementById("resultado").appendChild(fragment);
	document.getElementById("tabla").classList.remove("d-none");
}