const express = require('express');
const transactionRouter = express.Router();
const {
  create,
  find,
  findAll,
  update,
  remove,
} = require('../services/transactionService.js');

transactionRouter.post('api/transaction', create);
transactionRouter.get('api/transaction:period', find);
transactionRouter.get('api/transaction', findAll);
transactionRouter.put('api/transaction:id', update);
transactionRouter.delete('api/transaction:id', remove);

module.exports = transactionRouter;
