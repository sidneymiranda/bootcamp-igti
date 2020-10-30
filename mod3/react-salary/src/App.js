import React, { Component } from 'react';
import InputFullSalary from './components/InputFullSalary';
import InputReadOnly from './components/InputReadOnly';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 1000,
    };
  }
  render() {
    return (
      <>
        <h1>React Salário</h1>

        <InputFullSalary />
        <InputReadOnly id="base-inss" name="Base INSS" value="" />
        <InputReadOnly id="desc-inss" name="Desconto INSS" value="" />
        <InputReadOnly id="base-irpf" name="Base IRPF" value="" />
        <InputReadOnly id="desc-irpf" name="Desconto IRPF" value="" />
        <InputReadOnly id="salario-liquido" name="Salario líquido" value="" />
      </>
    );
  }
}
