import { promises as fs } from 'fs';

render();

async function render() {
  // await buildFile();
  console.log(await countCities('mg'));
  await fiveStateWithBiggerCities();
  await fiveStateWithlessCities();
  console.log(await cityWithBiggerNameByState());
  console.log(await cityWithSmallerNameByState());
  await cityNameBigger();
  await cityNameSmaller();
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
  let states = JSON.parse(await fs.readFile(`./states/${uf}.json`));
  return states.length;
}

// ORDENA OS ESTADOS COM A QTD DE CIDADES RESPECITVA
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

// CINCO ESTADOS COM MAIOR NÚMERO DE CIDADES
async function fiveStateWithBiggerCities() {
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

// CINCO ESTADOS COM MENOR NÚMERO DE CIDADES
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

// CIDADE COM MAIOR NOME POR ESTADO
async function cityWithBiggerNameByState() {
  let stateList = JSON.parse(await fs.readFile('./Estados.json'));
  let res = [];

  for (const { Sigla, ID } of stateList) {
    let current = JSON.parse(await fs.readFile(`./states/${Sigla}.json`));

    current = current.sort((a, b) => {
      if (b.Nome.length > a.Nome.length) {
        return 1;
      } else if (b.Nome.length < a.Nome.length) {
        return -1;
      }
      return 0;
    });
    current.slice(0, 1).map(({ Nome, Estado }) => {
      let state = Estado === ID ? Sigla : '';
      res.push({
        city: Nome,
        uf: state,
      });
    });
  }
  return res;
}

// CIDADE COM MENOR NOME POR ESTADO
async function cityWithSmallerNameByState() {
  let stateList = JSON.parse(await fs.readFile('./Estados.json'));
  let res = [];

  for (const { Sigla, ID } of stateList) {
    let current = JSON.parse(await fs.readFile(`./states/${Sigla}.json`));

    current = current.sort((a, b) => {
      if (a.Nome.length > b.Nome.length) {
        return 1;
      } else if (a.Nome.length < b.Nome.length) {
        return -1;
      }
      return 0;
    });
    current.slice(0, 1).map(({ Nome, Estado }) => {
      let state = Estado === ID ? Sigla : '';
      res.push({
        city: Nome,
        uf: state,
      });
    });
  }
  return res;
}

// CIDADE COM MAIOR NOME ENTRE ESTADOS
async function cityNameBigger() {
  let res = await cityWithBiggerNameByState();
  res = res
    .sort((a, b) => {
      if (b.city.length > a.city.length) {
        return 1;
      } else if (b.city.length < a.city.length) {
        return -1;
      }
      return 0;
    })
    .slice(0, 1);
  console.log(res);
}

// CIDADE COM MENOR NOME ENTRE ESTADOS
async function cityNameSmaller() {
  let res = await cityWithSmallerNameByState();
  res = res
    .sort((a, b) => {
      if (a.city.length > b.city.length) {
        return 1;
      } else if (a.city.length < b.city.length) {
        return -1;
      }
      return 0;
    })
    .slice(0, 1);
  console.log(res);
}
