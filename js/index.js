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

console.log(Date.now());

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Procesando...');
  console.log(input.value);
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
  // Reiniciamos el formulario
  formulario.reset();
  // Restaurar el focus
  input.focus();
};
