import mongoose from 'mongoose';

(async () => {
  await mongoose.connect(
    'mongodb+srv://admin:mongo-db@bootcamp-igti.qffct.mongodb.net/my_bank?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    }
  );
})();

// Criação do modelo
const clientSchema = mongoose.Schema({
  agencia: {
    type: Number,
    require: true,
  },
  conta: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  balance: {
    type: Number,
    require: true,
    min: 0,
  },
});

// Definindo o modelo da coleção
mongoose.model('client', clientSchema);

// Criação de um objeto
const client = mongoose.model('client');

new client({
  agencia: 20,
  conta: 1022,
  name: 'Gabriel Oliveira',
  balance: 2300,
})
  .save()
  .then(() => console.log('Documento inserido'))
  .catch(() => console.log('Falha ao inserir o documento'));
