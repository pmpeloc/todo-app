const formulario = document.getElementById('formulario');
const input = document.getElementById('input-tarea');
const listaTarea = document.getElementById('lista-tareas');
const template = document.getElementById('template-alerta').content;
const fragment = document.createDocumentFragment();
let tareas = {
  123: {
    id: 123,
    texto: 'Tarea 1',
    estado: false,
  },
  456: {
    id: 456,
    texto: 'Tarea 2',
    estado: false,
  },
};

// Mostrar las tareas al cargar
document.addEventListener('DOMContentLoaded', () => {
  mostrarTareas();
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
  // Evitamos el duplicado
  listaTarea.innerHTML = '';
  // Recorremos el objeto de las tareas para mostarlo en pantalla
  Object.values(tareas).forEach((tarea) => {
    console.log(tarea);
    // Primero clonamos el template
    const clon = template.cloneNode(true);
    // Al clon le asignamos el texto
    clon.querySelector('p').textContent = tarea.texto;
    // Al fragment le asignamos el clon creado
    fragment.appendChild(clon);
  });
  // Renderizamos en pantalla las tareas
  listaTarea.appendChild(fragment);
};
