const API_BASE_URL = 'http://127.0.0.1:8000/';

// Página de Configurações - Ver espectro do sinal de entrada
export const getInputSignal = async (params) => {
  try {
    const queryParams = new URLSearchParams({
      inputSignal: params.signalType,
      fi: params.startFrequency,
      ff: params.endFrequency,
      nf: params.frequencyPoints
    });

    const response = await fetch(`${API_BASE_URL}input-signal/magnitude-spectrum?${queryParams}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Erro ao buscar espectro do sinal de entrada:', error);
    throw error;
  }
};

// Página Orelha Externa - Obter FRF do canal auditivo
export const getOuterEarFRF = async (params) => {
  try {
    const queryParams = new URLSearchParams({
      ec_length: params.ecLength,
      fi: params.startFrequency,
      ff: params.endFrequency,
      nf: params.frequencyPoints,
      meCondition: params.meCondition || 'healthy',
      meSeverity: params.meSeverity || 'medium'
    });

    const response = await fetch(`${API_BASE_URL}outer-ear/frf?${queryParams}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Erro ao buscar FRF do canal auditivo:', error);
    throw error;
  }
};

// Página Orelha Externa - Análise no domínio do espaço
export const getSpaceDomainAnalysis = async (params) => {
  try {
    const queryParams = new URLSearchParams({
      ec_length: params.ecLength,
      meCondition: params.meCondition || 'healthy',
      meSeverity: params.meSeverity || 'medium',
      inputSignal: params.inputType || params.signalType
    });

    // Adiciona cada frequência como um parâmetro separado
    if (params.frequencies && params.frequencies.length > 0) {
      params.frequencies.forEach(freq => {
        queryParams.append('frequencies', freq);
      });
    }

    const response = await fetch(`${API_BASE_URL}outer-ear/space-domain-analysis?${queryParams}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Erro ao buscar análise no domínio do espaço:', error);
    throw error;
  }
};

// Página Orelha Externa - Análise no domínio da frequência
export const getFrequencyDomainAnalysis = async (params) => {
  try {
    const queryParams = new URLSearchParams({
      ec_length: params.ecLength,
      fi: params.startFrequency,
      ff: params.endFrequency,
      nf: params.frequencyPoints,
      inputSignal: params.signalType,
      meCondition: params.meCondition || 'healthy',
      meSeverity: params.meSeverity || 'medium',
    });

    // Adiciona cada posição como um parâmetro separado
    if (params.positions && params.positions.length > 0) {
      params.positions.forEach(pos => {
        queryParams.append('positions', pos);
      });
    }

    const response = await fetch(`${API_BASE_URL}outer-ear/frequency-domain-analysis?${queryParams}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Erro ao buscar análise no domínio da frequência:', error);
    throw error;
  }
};
