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
