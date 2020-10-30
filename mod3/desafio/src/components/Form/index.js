import React from 'react';

export default function Form() {
  return (
    <>
      <label>Montante inicial</label>
      <input type="number" min="100" max="100000" />
      <label>Taxa de juros mensal</label>
      <input type="number" min="-12" max="12" />
      <label>Perído (meses)</label>
      <input type="number" min="1" max="36" />
    </>
  );
}
