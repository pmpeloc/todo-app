const formulario = document.getElementById('formulario');
const listaTarea = document.getElementById('lista-tareas');
const template = document.getElementById('template');
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
