
// Configuration interface
interface VogentConfig {
  agentId: string;
  fromNumberId: string;
}

// Configuration map for different pages
const VOGENT_CONFIGS: Record<string, VogentConfig> = {
  roomService: {
    agentId: "cd922dc9-eea6-4b43-878f-cb5cfd67e005",
    fromNumberId: "53660ead-9260-4a23-8df2-55a7050b3340"
  },
  insurance: {
    agentId: "9ec7dc64-ca1e-4eaf-a54c-7942bf443bbc",
    fromNumberId: "53660ead-9260-4a23-8df2-55a7050b3340"
  },
  saas: {
    agentId: "15b75020-90a0-473a-b6bc-758ced586c6b",
    fromNumberId: "b79e025d-bb6c-4deb-99d5-a5f2f573c639"
  },
  mercedes: {
    agentId: "bcdfcfef-6f02-483b-a10e-f0e85d341414",
    fromNumberId: "5dff4f55-255f-4ee0-a8d4-d4efbc51bdf6"
  },
  realEstate: {
    agentId: "eb4d36d3-1a7e-4be4-8ab0-fe3f65fe7d1d",
    fromNumberId: "d4af3105-129a-4253-a636-aec3782c62a0"
  },
  barbershop: {
    agentId: "4b2d92b5-d58a-45a1-8e46-9aab39c99ae5",
    fromNumberId: "0a2a5209-0a45-415b-955d-4ed9540390ce"
  }
};

export const initiateVogentCall = async (userPhoneNumber: string, pageType: keyof typeof VOGENT_CONFIGS) => {
  try {
    console.log('Initiating call with phone number:', userPhoneNumber);
    
    const config = VOGENT_CONFIGS[pageType];
    if (!config) {
      throw new Error('Invalid page type specified');
    }

    const response = await fetch('https://api.vogent.ai/api/dials', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer elto_fvRkQ2V9PYDyDpdxK9kGMCpJLqESEJiH',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        agent_id: config.agentId,
        toNumber: `+1${userPhoneNumber}`,
        fromNumberId: config.fromNumberId,
        callAgentId: config.agentId
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response from Vogent API:', errorData);
      throw new Error(errorData.message || 'Failed to initiate call');
    }

    const data = await response.json();
    console.log('Call initiated successfully:', data);
    return data;

  } catch (error) {
    console.error('Error in initiateVogentCall:', error);
    throw error;
  }
};
