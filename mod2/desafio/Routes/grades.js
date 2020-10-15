import { throws } from 'assert';
import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const router = express.Router();

// ENDPOINT PARA CADASTRAR
router.post('/', async (req, res) => {
  let grade = req.body;
  try {
    const data = JSON.parse(await readFile(global.fileName, 'utf8'));

    grade = { id: data.nextId++, ...grade, timestamp: new Date() };
    data.grades.push(grade);

    await writeFile(global.fileName, JSON.stringify(data));

    res.send(grade);
  } catch (err) {
    res.status(400).send({ error: error.message });
  }
});

// ENDPOINT DE RETORNO DE TODOS OS DADOS
router.get('/', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName, 'utf8'));

    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// ENDPOINT DE RETORNO POR PARÂMETRO - ID
router.get('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName, 'utf8'));

    const grade = data.grades.find(({ id }) => id === parseInt(req.params.id));

    res.send(grade);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// ENDPOINT PARA SOMAR NOTAS DE UM ALUNO
router.get('/:student/:subject', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName, 'utf8'));

    const sum = data.grades
      .filter(({ student, subject }) => {
        return student === req.params.student && subject === req.params.subject;
      })
      .reduce((acc, { value }) => {
        return acc + value;
      }, 0);

    res.send(JSON.stringify(sum));
  } catch (err) {
    next(err);
  }
});

// ENDPOINT PARA EXCLUIR UM REGISTRO PELO ID
router.delete('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName, 'utf8'));

    data.grades = data.grades.filter(
      ({ id }) => id !== parseInt(req.params.id)
    );

    await writeFile('grades.json', JSON.stringify(data));
    res.end();
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// ENDPOINT PARA ATUALIZAR UMA GRADE
router.put('/', async (req, res) => {
  try {
    let grade = req.body;
    const data = JSON.parse(await readFile(global.fileName, 'utf8'));
    const index = data.grades.findIndex(({ id }) => id === grade.id);

    if (index === -1) {
      throw new Error('ID não localizado!');
    }
    if (grade.student) {
      data.grades[index].student = grade.student;
    }
    if (grade.subject) {
      data.grades[index].subject = grade.subject;
    }
    if (grade.type) {
      data.grades[index].type = grade.type;
    }
    if (grade.value) {
      data.grades[index].value = grade.value;
    }

    await writeFile(fileName, JSON.stringify(data));
    res.send(data.grades[index]);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// ENDPOINT PARA RETORNAR A MÉDIA DOS VALUES
router.get('/average/:subject/:type', async (req, res, next) => {
  try {
    const json = JSON.parse(await readFile(global.fileName, 'utf8'));

    const grades = json.grades.filter(
      (grade) =>
        grade.subject === req.params.subject && grade.type === req.params.type
    );

    if (!grades.length) {
      throw new Error(
        'Não foram encontrados registros com os parâmetros informados'
      );
    }
    const total = grades.reduce((prev, curr) => {
      return prev + curr.value;
    }, 0);

    res.send({ average: total / grades.length });
  } catch (err) {
    next(err);
  }
});

router.post('/best', async (req, res) => {
  try {
    const json = JSON.parse(await readFile(global.fileName, 'utf8'));
    const grades = json.grades.filter(
      (grade) =>
        grade.subject === req.body.subject && grade.type === req.body.type
    );
    if (!grades.length) {
      throw new Error('Não foram localizados!');
    }

    grades.sort((a, b) => {
      if (a.value < b.value) return 1;
      else if (a.value > b.value) return -1;
      else return 0;
    });

    res.send(grades.slice(0, 3));
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
