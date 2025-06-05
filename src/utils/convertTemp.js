// utils/tempConvert.js
export const convertTemp = (temp, toUnit) => {
    if (typeof temp !== 'number') return temp;
  
    return toUnit === 'fahrenheit'
      ? Math.round((temp * 9) / 5 + 32)
      : Math.round(((temp - 32) * 5) / 9);
  };
  