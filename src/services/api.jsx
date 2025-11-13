const API_BASE_URL = 'http://127.0.0.1:8000/';


export const getInputSignal = async (settings) => {
  try {
    const params = new URLSearchParams({
      fi: settings.frequencyMin,
      ff: settings.frequencyMax,
      nf: settings.numberOfFrequencies,
      inputSignal: settings.inputSignal
    });

    const response = await fetch(`${API_BASE_URL}input-signal/magnitude-spectrum?${params}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Erro ao buscar espectro:', error);
    throw error;
  }
};

export const getFrequencyDomainAnalysis = async (params) => {
  try {
    const queryParams = new URLSearchParams({
      ec_length: params.earCanalLength,
      fi: params.frequencyMin,
      ff: params.frequencyMax,
      nf: params.numberOfFrequencies,
      inputSignal: params.inputSignal
    });

    // Add each position as a separate "positions" parameter
    if (params.positionsToAnalyze && params.positionsToAnalyze.length > 0) {
      params.positionsToAnalyze.forEach(position => {
        queryParams.append('positions', position);
      });
    }

    // Add optional middle ear parameters if they exist
    if (params.middleEarCondition !== undefined) {
      queryParams.append('middleEarCondition', params.middleEarCondition);
    }
    if (params.middleEarSeverity !== undefined) {
      queryParams.append('middleEarSeverity', params.middleEarSeverity);
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
