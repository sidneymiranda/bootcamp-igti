import express from 'express';
import gradesRouter from './Routes/grades.js';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

global.fileName = 'grades.json';

const app = express();

app.use(express.json());

app.use('/grades', gradesRouter);

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
  } catch (err) {
    const initialJson = {
      nextId: 1,
      grades: [],
    };
    try {
      await writeFile(global.fileName, JSON.stringify(initialJson));
    } catch (err) {
      console.log(err);
    }
  }
  console.log('API started!');
});
