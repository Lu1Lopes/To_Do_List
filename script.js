const list = document.getElementById('lista-tarefas');
const input = document.getElementById('texto-tarefa');

function createTask(text, className) {
  const newTask = document.createElement('li');
  newTask.innerText = text;
  newTask.className = className;
  list.append(newTask);
}

function addTask() {
  function getValue() {
    const { value } = input;
    document.getElementById('texto-tarefa').value = '';
    if (!value) return;
    createTask(value, 'task');
  }
  const button = document.getElementById('criar-tarefa');
  button.addEventListener('click', () => {
    getValue();
  });
  input.addEventListener('keyup', (event) => {
    const { key } = event;
    if (key === 'Enter') {
      getValue();
    }
  });
}
addTask();

function saveTasks() {
  const button = document.getElementById('salvar-tarefas');
  button.addEventListener('click', () => {
    localStorage.list = list.innerHTML;
    alert('Lista salva');
  });
}
saveTasks();

function recoverTasks() {
  const oldList = localStorage.getItem('list');
  if (!oldList) return;
  list.innerHTML = oldList;
}
recoverTasks();

function removeTaskSelected() {
  const selected = document.querySelector('.selected');
  if (selected) selected.classList.remove('selected');
}

function selectTask() {
  list.addEventListener('click', (event) => {
    removeTaskSelected();
    event.target.classList.add('selected');
  });
}
selectTask();

function taskFinished() {
  list.addEventListener('dblclick', (event) => {
    const { target } = event;
    if (target.classList.contains('completed')) {
      target.classList.remove('completed');
    } else {
      target.classList.add('completed');
    }
  });
}
taskFinished();

function removeByQuerry(querry) {
  const elements = document.querySelectorAll(querry);
  for (let i = 0; i < elements.length; i += 1) {
    elements[i].remove();
  }
}

function removeFinished() {
  const button = document.getElementById('remover-finalizados');
  button.addEventListener('click', () => {
    removeByQuerry('.completed');
  });
}
removeFinished();

function removeAllTasks() {
  const button = document.getElementById('apaga-tudo');
  button.addEventListener('click', () => {
    removeByQuerry('.task');
  });
}
removeAllTasks();

function removeSelected() {
  const button = document.getElementById('remover-selecionado');
  button.addEventListener('click', () => {
    removeByQuerry('.selected');
  });
}
removeSelected();

function moveUp() {
  const button = document.getElementById('mover-cima');
  button.addEventListener('click', () => {
    const selected = document.querySelector('.selected');
    if (!selected) return;
    if (selected.previousElementSibling) {
      selected.parentNode.insertBefore(selected, selected.previousElementSibling);
      // https://stackoverflow.com/questions/34913953/move-an-element-one-place-up-or-down-in-the-dom-tree-with-javascript   -> second comment <3
      // ele verifica se o elemento tem um irmao antes, se tiver ele pega o pai e usa a funcao inserir antes
    }
  });
}
moveUp();

function moveDown() {
  const button = document.getElementById('mover-baixo');
  button.addEventListener('click', () => {
    const selected = document.querySelector('.selected');
    if (!selected) return;
    if (selected.nextElementSibling) {
      selected.parentNode.insertBefore(selected.nextElementSibling, selected);
    }
  });
}
moveDown();

function selectRemover() {
  const { body } = document;
  body.addEventListener('click', (event) => {
    const { tagName } = event.target;
    if (tagName !== 'LI' && tagName !== 'INPUT' && tagName !== 'BUTTON'
    && tagName !== 'IMG') {
      removeTaskSelected();
    }
  });
}
selectRemover();