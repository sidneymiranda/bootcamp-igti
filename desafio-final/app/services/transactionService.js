const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const {
  description,
  value,
  category,
  year,
  month,
  day,
  yearMonth,
  yearMonthDay,
  type,
} = TransactionModel;

async function create(_, res) {
  const transaction = new TransactionModel({
    description: description,
    value: value,
    category: category,
    year: year,
    month: month,
    day: day,
    yearMonth: yearMonth,
    yearMonthDay: yearMonthDay,
    type: type,
  });
  try {
    await TransactionModel.save(transaction);
    res.send({ message: 'Transação realizada com sucesso!' });
  } catch (err) {
    res.status(500).send({ message: err.message || 'Erro na transação' });
  }
}

async function find(req, res) {
  const period = req.params.yearMonth;

  try {
    const data = await TransactionModel.find({ yearMonth: period });
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || 'Erro ao listar!' });
  }
}

async function findAll(req, res) {
  try {
    const data = await TransactionModel.find();
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || 'Erro ao listar!' });
  }
}

async function update(req, res) {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: 'Dados para atualização não informados!' });
  }
  const id = req.params.id;

  try {
    const data = await TransactionModel.findByIdAndUpdate(
      { _id: ObjectId(id) },
      req.body,
      {
        new: true,
      }
    );

    if (data.length < 1) {
      res
        .status(404)
        .send({ message: `Transação com id ${id} não encontrado` });
    } else {
      res.send({ message: 'Transação atualizada com sucesso!' });
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: `Erro ao atualizar a transação com id ${id}` });
  }
}

async function remove(req, res) {
  const id = req.params.id;

  try {
    const data = await TransactionModel.findByIdAndRemove({
      _id: ObjectId(id),
    });

    if (data.length < 1) {
      res
        .status(404)
        .send({ message: `Transação com id ${id} não encontrada!` });
    } else {
      res.send({ message: 'Transação excluída com sucesso!' });
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: `Não foi possível remover a transação com id: ${id}` });
  }
}

module.exports = {
  create,
  find,
  findAll,
  update,
  remove,
};
