let globalNames = [];
let inputName = null;
let isEditing = false;

window.addEventListener('load', () => {
  inputName = document.querySelector('#inputName');

  preventFormSubmit();
  activateIput();
  render();
});

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventFormDefaut();
  }
  let form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateIput() {
  function insertName(newName) {
    globalNames = [...globalNames, newName];
  }

  function handleTyping(event) {
    if (event.key === 'Enter') {
      if (isEditing) {
      } else {
        insertName(event.key.value);
      }
      isEditing = false;
    }
    let hasText = !!event.target.value && event.target.value.trim() !== '';

    if (!hasText) {
      clearInput();
      return;
    }

    render();
  }

  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}

function render() {
  var divNames = document.querySelector('#listNames');
  divNames.innerHTML = '';

  var ul = document.createElement('ul');

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    let li = document.createElement('li');
    let span = document.createElement('span');
    span.textContent = currentName;

    const buttonDelete = createDeleteButton(i);
    const buttonUpdate = createUpdateButton(span.textContent);

    li.appendChild(buttonDelete);
    li.appendChild(span);
    li.appendChild(buttonUpdate);
    ul.appendChild(li);
  }

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
      inputName.focus();
      isEditing = true;
    });

    return button;
  }

  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  inputName.value = '';
}
