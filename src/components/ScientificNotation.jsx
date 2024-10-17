const ScientificNotation = ({ number }) => {
  // Convertir el número a notación científica con 2 decimales
  const scientificNumber = number.toExponential(2);
  return scientificNumber;
};

export default ScientificNotation