import { promises as fs } from 'fs';

render();

async function render() {
  // await buildFile();
  // console.log(await countCities('mg'));
  await fiveStateWithMoreCities();
  await fiveStateWithlessCities();
  // await cityWithMoreName();
}

// CRIA O ARQUIVO DE ESTADO COM SUAS RESPECTIVAS CIDADES
async function buildFile() {
  let stateList = JSON.parse(await fs.readFile('./Estados.json'));
  let citiesList = JSON.parse(await fs.readFile('./Cidades.json'));

  stateList.forEach(({ ID, Sigla }) => {
    let cityByState = citiesList.filter(({ Estado }) => Estado === ID);
    fs.writeFile(`./states/${Sigla}.json`, JSON.stringify(cityByState));
  });
}

// QTD DE CIDADES PASSANDO O ESTADO
async function countCities(uf) {
  let count = 0;
  let states = JSON.parse(await fs.readFile(`./states/${uf}.json`));
  return states.length;
}

async function sortStates() {
  let array = [];
  let states = JSON.parse(await fs.readFile('./Estados.json'));

  for (const { Sigla } of states) {
    let qtd = await countCities(Sigla);
    let res = {
      uf: Sigla,
      cities: qtd,
    };
    array.push(res);
  }
  return array;
}

// CINCO ESTADOS COM MAIS CIDADES
async function fiveStateWithMoreCities() {
  let array = await sortStates();
  array = array.sort((a, b) => {
    if (b.cities > a.cities) {
      return 1;
    } else if (b.cities < a.cities) {
      return -1;
    }
    return 0;
  });

  console.log(array.slice(0, 5));
}

async function fiveStateWithlessCities() {
  let array = await sortStates();
  array = array.sort((a, b) => {
    if (a.cities > b.cities) {
      return 1;
    } else if (a.cities < b.cities) {
      return -1;
    }
    return 0;
  });
  console.log(array.slice(0, 5));
}

// async function cityWithMoreName() {
//   let stateList = JSON.parse(await fs.readFile('./Estados.json'));
//   let citiesList = JSON.parse(await fs.readFile('./Cidades.json'));
// }
