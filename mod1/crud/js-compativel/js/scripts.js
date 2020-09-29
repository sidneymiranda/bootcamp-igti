window.addEventListener('load', start);

var globalNames = [];

function start() {
  inputName = document.querySelector('#inputName');

  preventFormDefaut();
  activateIput();
  render();
}

function preventFormDefaut() {
  var form = document.querySelector('form');
  form.addEventListener('submit', (event) => event.preventDefault());
}

function activateIput() {
  inputName.focus();
  inputName.addEventListener('keyup', handleTyping);

  function handleTyping(event) {
    if (event.key === 'Enter') {
      globalNames.push(event.target.value);
      render();
    }
  }
}

function render() {
  clearInput();
  var divNames = document.querySelector('#listNames');
  var ul = document.createElement('ul');

  divNames.innerHTML = '';

  function createDeleteButton(index) {
    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.classList.add('clickable');
    button.textContent = 'x';

    button.addEventListener('click', () => {
      globalNames.splice(index, 1);
      render();
    });

    return button;
  }

  function createUpdateButton(name) {
    var button = document.createElement('button');
    button.classList.add('updateButton');
    button.classList.add('clickable');
    button.textContent = 'editar';

    button.addEventListener('click', () => {
      inputName.value = name;
    });

    return button;
  }

  for (var i = 0; i < globalNames.length; i++) {
    let li = document.createElement('li');
    let span = document.createElement('span');
    span.textContent = globalNames[i];

    const buttonDelete = createDeleteButton(i);
    const buttonUpdate = createUpdateButton(span.textContent);

    li.appendChild(buttonDelete);
    li.appendChild(span);
    li.appendChild(buttonUpdate);
    ul.appendChild(li);
  }

  divNames.appendChild(ul);
}

function clearInput() {
  inputName.value = '';
}
