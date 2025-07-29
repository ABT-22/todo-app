const input = document.getElementById("tareaInput");
const boton = document.getElementById("agregarBtn");
const lista = document.getElementById("listaTareas");

// 🔁 Función para guardar tareas en localStorage
function guardarTareas() {
  const tareas = [];
  lista.querySelectorAll("li").forEach(li => {
    tareas.push({
      texto: li.querySelector("span").textContent,
      completada: li.classList.contains("completada")
    });
  });
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// 📦 Función para cargar tareas al iniciar
function cargarTareas() {
  const tareasGuardadas = JSON.parse(localStorage.getItem("tareas"));
  if (!tareasGuardadas) return;

  tareasGuardadas.forEach(tarea => {
    crearTarea(tarea.texto, tarea.completada);
  });
}

// 🧱 Función que crea una tarea y la añade a la lista
function crearTarea(texto, estaCompletada = false) {
  const li = document.createElement("li");

  if (estaCompletada) li.classList.add("completada");

  const spanTexto = document.createElement("span");
  spanTexto.textContent = texto;

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "❌";
  btnEliminar.style.marginLeft = "10px";

  // ✅ Completar tarea
  spanTexto.addEventListener("click", () => {
    li.classList.toggle("completada");
    guardarTareas();
  });

  // ❌ Eliminar tarea
  btnEliminar.addEventListener("click", () => {
    lista.removeChild(li);
    guardarTareas();
  });

  li.appendChild(spanTexto);
  li.appendChild(btnEliminar);
  lista.appendChild(li);
}

// 🎯 Evento para agregar nueva tarea
boton.addEventListener("click", () => {
  const texto = input.value.trim();
  if (texto === "") return;

  crearTarea(texto);
  guardarTareas();
  input.value = "";
  input.focus();
});

// 🔁 Cargar tareas guardadas al iniciar
cargarTareas();
