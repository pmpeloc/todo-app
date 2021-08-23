const formulario = document.getElementById('formulario');
const input = document.getElementById('input-tarea');
const listaTarea = document.getElementById('lista-tareas');
const template = document.getElementById('template-alerta').content;
const fragment = document.createDocumentFragment();
// let tareas = {
//   123: {
//     id: 123,
//     texto: 'Tarea 1',
//     estado: false,
//   },
//   456: {
//     id: 456,
//     texto: 'Tarea 2',
//     estado: false,
//   },
// };
let tareas = {};

// Mostrar las tareas al cargar
document.addEventListener('DOMContentLoaded', () => {
  mostrarTareas();
});

listaTarea.addEventListener('click', (e) => {
  // Llamo a la función que observa donde hago click
  btnAccion(e);
});

// console.log(Date.now());

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Procesando...');
  // console.log(input.value);
  // Llamamos a una función para crear tareas
  setTarea(e);
});

const setTarea = (e) => {
  // Validamos lo que esta ingresando
  if (input.value.trim() === '') {
    console.log('esta vacío');
    return;
  }
  console.log('Enviando tarea...');
  // Creamos la nueva tarea
  const tarea = {
    id: Date.now(),
    texto: input.value,
    estado: false,
  };
  // console.log(tarea);
  // Agregamos la nueva tarea al objeto tareas
  tareas[tarea.id] = tarea;
  // console.log(tareas);
  // Reiniciamos el formulario
  formulario.reset();
  // Restaurar el focus
  input.focus();
  // Llamamos a la función para mostrar las tareas
  mostrarTareas();
};

const mostrarTareas = () => {
  // Verificamos si no tenemos tareas creadas
  if (Object.values(tareas).length === 0) {
    listaTarea.innerHTML = `<div class="alert alert-dark text-center">
      No hay tareas pendientes :)
    </div>`;
    return;
  }
  // Evitamos el duplicado
  listaTarea.innerHTML = '';
  // Recorremos el objeto de las tareas para mostarlo en pantalla
  Object.values(tareas).forEach((tarea) => {
    // console.log(tarea);
    // Primero clonamos el template
    const clon = template.cloneNode(true);
    // Al clon le asignamos el texto
    clon.querySelector('p').textContent = tarea.texto;
    // Cambiamos el ícono para la tarea completada
    if (tarea.estado === true) {
      clon
        .querySelector('.alert')
        .classList.replace('alert-warning', 'alert-primary');
      clon
        .querySelectorAll('.fas')[0]
        .classList.replace('fa-check-circle', 'fa-undo-alt');
      clon.querySelector('p').style.textDecoration = 'line-through';
    }
    // Asignamos los ids a los íconos
    clon.querySelectorAll('.fas')[0].dataset.id = tarea.id;
    clon.querySelectorAll('.fas')[1].dataset.id = tarea.id;
    // Al fragment le asignamos el clon creado
    fragment.appendChild(clon);
  });
  // Renderizamos en pantalla las tareas
  listaTarea.appendChild(fragment);
};

const btnAccion = (e) => {
  console.log(e.target.classList.contains('fa-check-circle'));
  if (e.target.classList.contains('fa-check-circle')) {
    console.log(e.target.dataset.id);
    tareas[e.target.dataset.id].estado = true;
    mostrarTareas();
    console.log(tareas);
  }
  if (e.target.classList.contains('fa-minus-circle')) {
    delete tareas[e.target.dataset.id];
    mostrarTareas();
    console.log(tareas);
  }
  if (e.target.classList.contains('fa-undo-alt')) {
    tareas[e.target.dataset.id].estado = false;
    mostrarTareas();
  }
  // Evitar que otros eventos se activen fuera de este contenedor
  e.stopPropagation();
};
