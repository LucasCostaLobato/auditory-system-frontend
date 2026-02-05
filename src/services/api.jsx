const API_BASE_URL = 'http://127.0.0.1:8000/';

// Página Fundamentos - Acústica: Sobreposição de senoides
export const getFundamentalsAcoustics = async (params) => {
  try {
    const queryParams = new URLSearchParams();

    params.amplitudes.forEach(a => queryParams.append('amplitudes', a));
    params.frequencies.forEach(f => queryParams.append('frequencies', f));
    params.phases.forEach(p => queryParams.append('phases', p));

    const response = await fetch(`${API_BASE_URL}fundamentals/acoustics?${queryParams}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Erro ao buscar sinal acústico:', error);
    throw error;
  }
};

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

// Página Orelha Média - Ver FRF
export const getMiddleEarFRF = async (params) => {
  try {
    const queryParams = new URLSearchParams({
      fi: params.startFrequency,
      ff: params.endFrequency,
      nf: params.frequencyPoints,
      meCondition: params.meCondition || 'healthy',
      meSeverity: params.meSeverity || 'medium'
    });

    // Adiciona cada medida como um parâmetro separado
    if (params.measures && params.measures.length > 0) {
      params.measures.forEach(measure => {
        queryParams.append('measures', measure);
      });
    }

    const response = await fetch(`${API_BASE_URL}middle-ear/frf?${queryParams}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Erro ao buscar FRF da orelha média:', error);
    throw error;
  }
};

// Página Orelha Média - Ver resposta à excitação
export const getMiddleEarDynamicBehavior = async (params) => {
  try {
    const queryParams = new URLSearchParams({
      fi: params.startFrequency,
      ff: params.endFrequency,
      nf: params.frequencyPoints,
      ec_length: params.ecLength || params.canalLength,
      meCondition: params.meCondition || 'healthy',
      meSeverity: params.meSeverity || 'medium',
      inputSignal: params.inputSignal || params.signalType
    });

    // Adiciona cada medida como um parâmetro separado
    if (params.measures && params.measures.length > 0) {
      params.measures.forEach(measure => {
        queryParams.append('measures', measure);
      });
    }

    const response = await fetch(`${API_BASE_URL}middle-ear/dynamic-behavior?${queryParams}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Erro ao buscar resposta à excitação da orelha média:', error);
    throw error;
  }
};

// Página Orelha Interna - Ver envelope do deslocamento da MB
export const getInnerEarBMEnvelope = async (params) => {
  try {
    const queryParams = new URLSearchParams({
      freq_stimulus: params.freqStimulus
    });

    const response = await fetch(`${API_BASE_URL}inner-ear/bm-envelope?${queryParams}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Erro ao buscar envelope da membrana basilar:', error);
    throw error;
  }
};

// Página Orelha Interna - Ver ondas viajantes na MB
export const getInnerEarTravellingWaves = async (params) => {
  try {
    const queryParams = new URLSearchParams({
      freq_stimulus: params.freqStimulus
    });

    const response = await fetch(`${API_BASE_URL}inner-ear/bm-travelling-waves?${queryParams}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Erro ao buscar ondas viajantes da membrana basilar:', error);
    throw error;
  }
};
