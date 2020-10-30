import React, { useState, useEffect } from 'react';

export default function Installment() {
  const { montante, setMontante } = useState(0);
  const { taxa, setTaxa } = useState(0.0);
  const { periodo, setPeriodo } = useState(1);

  const handleInputChange = (event) => {
    return setMontante(event.target.value);
  };

  useEffect(() => {
    handleInputChange();
  });

  return (
    <div>
      <span>{montante}</span>
    </div>
  );
}
