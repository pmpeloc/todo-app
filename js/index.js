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
  // Obtenemos las tareas del Local Storage
  if (localStorage.getItem('tareas')) {
    tareas = JSON.parse(localStorage.getItem('tareas'));
  }
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
  // Guardamos las tareas en el Local Storage
  localStorage.setItem('tareas', JSON.stringify(tareas));
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
    clon.querySelectorAll('.fas')[2].dataset.id = tarea.id;
    clon.querySelectorAll('.fas')[3].dataset.id = tarea.id;
    clon.querySelector('.upgrade').dataset.id = tarea.id;
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
  // Reproducir la tarea
  if (e.target.classList.contains('fa-play-circle')) {
    speechSynthesis.speak(
      new SpeechSynthesisUtterance(tareas[e.target.dataset.id].texto)
    );
  }
  // Editar una tarea
  if (e.target.classList.contains('fa-edit')) {
    // Ocultar el párrafo y mostrar el input
    document.querySelector('p').hidden = true;
    const entradas = document.querySelectorAll('input[data-id]');
    const elegido = [...entradas].find(
      (entrada) => entrada.getAttribute('data-id') === e.target.dataset.id
    );
    elegido.value = tareas[e.target.dataset.id].texto;
    elegido.hidden = false;
    // Guardar el cambio, ocultar el input y mostrar el párrafo
    elegido.addEventListener('blur', () => {
      tareas[e.target.dataset.id].texto = elegido.value;
      console.log(tareas);
      elegido.hidden = true;
      document.querySelector('p').hidden = false;
      mostrarTareas();
    });
  }
  // Evitar que otros eventos se activen fuera de este contenedor
  e.stopPropagation();
};

// Agregar funcionalidad que permite agregar tareas de voz
let reconocimiento = undefined;

// Segundo: Empezar a escuchar lo que el usuario habla
const escuchar = (e) => {
  let index = e.resultIndex;
  let content = e.results[index][0].transcript;
  // console.log(content);
  input.value = content;
};

// Primero: Comprobamos si esta disponible la funcionalidad e iniciar configuración
if (!('webkitSpeechRecognition' in window)) {
  alert('Usted no puede usar el micrófono');
} else {
  reconocimiento = new webkitSpeechRecognition();
  reconocimiento.lang = 'es-AR';
  reconocimiento.continuous = true;
  reconocimiento.interim = true;
  reconocimiento.addEventListener('result', escuchar);
  reconocimiento.start();
}
