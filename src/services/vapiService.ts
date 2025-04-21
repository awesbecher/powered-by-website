
interface VapiConfig {
  apiKey: string;
  assistantId: string;
}

const DEFAULT_VAPI_CONFIG: VapiConfig = {
  apiKey: 'a212f18f-9d02-4703-914f-ac89661262c5',
  assistantId: 'ebb38ba5-321a-49e4-b860-708bc864327f'
};

export async function initiateVapiCall(): Promise<void> {
  try {
    console.log('Initiating Vapi AI call with assistant ID:', DEFAULT_VAPI_CONFIG.assistantId);
    
    // Open Vapi AI in a new window with the demo parameters
    const vapiUrl = `https://vapi.ai?demo=true&shareKey=${DEFAULT_VAPI_CONFIG.apiKey}&assistantId=${DEFAULT_VAPI_CONFIG.assistantId}`;
    
    // Open in a popup window
    const width = 400;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    
    window.open(
      vapiUrl, 
      'VapiAICall', 
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`
    );
    
    console.log('Vapi AI call window opened');
    return Promise.resolve();
  } catch (error) {
    console.error('Error initiating Vapi AI call:', error);
    return Promise.reject(error);
  }
}
