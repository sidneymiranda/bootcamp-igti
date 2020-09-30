// Estados da aplicação

let usersFiltered = null;
let enterUser = null;
let formSubmit = null;
let statistics = null;
let spanTotalResults = null;
let btnSearch = null;

let spanGenderMale = null;
let spanGenderFemale = null;
let spanSumAge = null;
let spanAverageAge = null;

let allUsers = [];
let filter = [];

let countGenderMale = 0;
let countGenderFemale = 0;
let sumAges = 0;
let ageAverage = 0;

window.addEventListener('load', () => {
  usersFiltered = document.querySelector('#users-filtered');
  enterUser = document.querySelector('#input-search');
  formSubmit = document.querySelector('formSubmit');
  spanTotalResults = document.querySelector('#total-results');
  statistics = document.querySelector('#users-statistics');
  spanGenderMale = document.querySelector('#gender-male');
  spanGenderFemale = document.querySelector('#gender-female');
  spanSumAge = document.querySelector('#sum-age');
  spanAverageAge = document.querySelector('#average-age');
  formSubmit = document.querySelector('form');
  btnSearch = document.querySelector('btn-search');

  fetchUsers();
});

async function fetchUsers() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );

  const json = await res.json();

  allUsers = json.results.map((user) => {
    const { name, dob, picture, gender } = user;

    return {
      name: name.first + ' ' + name.last,
      age: dob.age,
      picture: picture.thumbnail,
      gender,
    };
  });

  render();
}

function render() {
  renderUserFiltered();
  handleInput();
}

function renderUserFiltered(e) {
  let usersHTML = '';

  filter = allUsers.filter(
    (user) => (user = e !== '' ? user.name.toLowerCase().includes(e) : false)
  );
  renderSumary();
  usersHTML = `<h2><span id="total-results">${filter.length}</span> Usuário(s) encontrado(s)</h2>`;
  filter.forEach((user) => {
    const { name, age, picture } = user;

    const peopleHTML = `
    <div class="container-results">    
      <ul class="list">
        <li><img class="img" src=${picture} alt=${name}></li>
        <li><pre>${name}, ${age} anos</pre></li>        
      </ul>
    </div>
    `;
    usersHTML += peopleHTML;
  });

  usersFiltered.innerHTML = usersHTML;
}

function handleInput() {
  // prettier ignore
  enterUser.addEventListener('keyup', (e) => {
    renderUserFiltered(e.target.value);
  });

  formSubmit.addEventListener('submit', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      renderUserFiltered(e.target.value);
    }
  });
}

function renderSumary() {
  spanTotalResults.textContent = filter.length;

  spanGenderMale.textContent = filter.filter(
    (user) => user.gender === 'male'
  ).length;

  spanGenderFemale.textContent = filter.filter(
    (user) => user.gender === 'female'
  ).length;

  spanSumAge.textContent = filter.reduce((acc, curr) => {
    return acc + curr.age;
  }, 0);

  spanAverageAge.textContent = filter.reduce((acc, curr) => {
    return acc + curr.age / filter.length;
  }, 0);
}
