/**
 * Calcula ticks "redondos" para o eixo X de gráficos
 * @param {number} min - Valor mínimo dos dados
 * @param {number} max - Valor máximo dos dados
 * @param {number} tickCount - Número aproximado de ticks desejados (default: 5)
 * @returns {number[]} Array de valores de ticks redondos
 */
export const calculateNiceTicks = (min, max, tickCount = 5) => {
  if (min === max) return [min];

  const range = max - min;
  const roughStep = range / (tickCount - 1);

  // Encontra a magnitude (potência de 10)
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));

  // Encontra o multiplicador mais próximo (1, 2, 5, 10)
  const residual = roughStep / magnitude;
  let niceStep;

  if (residual <= 1.5) {
    niceStep = magnitude;
  } else if (residual <= 3) {
    niceStep = 2 * magnitude;
  } else if (residual <= 7) {
    niceStep = 5 * magnitude;
  } else {
    niceStep = 10 * magnitude;
  }

  // Calcula o início e fim redondos
  const niceMin = Math.floor(min / niceStep) * niceStep;
  const niceMax = Math.ceil(max / niceStep) * niceStep;

  // Gera os ticks
  const ticks = [];
  for (let tick = niceMin; tick <= niceMax + niceStep * 0.5; tick += niceStep) {
    // Arredonda para evitar erros de ponto flutuante
    const roundedTick = Math.round(tick * 1e10) / 1e10;
    if (roundedTick >= min - niceStep * 0.1 && roundedTick <= max + niceStep * 0.1) {
      ticks.push(roundedTick);
    }
  }

  // Garante que temos pelo menos 2 ticks
  if (ticks.length < 2) {
    return [min, max];
  }

  return ticks;
};

/**
 * Calcula ticks logarítmicos (potências de 10)
 * @param {number} min - Valor mínimo dos dados
 * @param {number} max - Valor máximo dos dados
 * @returns {number[]} Array de potências de 10 dentro do intervalo
 */
export const calculateLogTicks = (min, max) => {
  if (min <= 0) min = 1; // Log não funciona com valores <= 0
  if (max <= 0) max = 1;

  const minPower = Math.floor(Math.log10(min));
  const maxPower = Math.ceil(Math.log10(max));

  const ticks = [];
  for (let power = minPower; power <= maxPower; power++) {
    const tick = Math.pow(10, power);
    if (tick >= min * 0.9 && tick <= max * 1.1) {
      ticks.push(tick);
    }
  }

  // Se temos poucos ticks, adiciona valores intermediários (2x e 5x)
  if (ticks.length < 3) {
    const expandedTicks = [];
    for (let power = minPower; power <= maxPower; power++) {
      const base = Math.pow(10, power);
      [1, 2, 5].forEach(mult => {
        const tick = base * mult;
        if (tick >= min * 0.9 && tick <= max * 1.1) {
          expandedTicks.push(tick);
        }
      });
    }
    return expandedTicks.length >= 2 ? expandedTicks : ticks;
  }

  return ticks;
};

/**
 * Formata valores de ticks de forma inteligente
 * @param {number} value - Valor a ser formatado
 * @returns {string} Valor formatado
 */
export const formatTickValue = (value) => {
  if (value === 0) return '0';

  const absValue = Math.abs(value);

  if (absValue >= 1000) {
    return value.toLocaleString('pt-BR');
  } else if (absValue >= 1) {
    return Number.isInteger(value) ? value.toString() : value.toFixed(1);
  } else if (absValue >= 0.01) {
    return value.toFixed(2);
  } else {
    return value.toPrecision(2);
  }
};
