
export const initiateVogentCall = async (userPhoneNumber: string) => {
  try {
    console.log('Initiating call with phone number:', userPhoneNumber);
    
    const response = await fetch('https://api.vogent.ai/api/dials', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer elto_fvRkQ2V9PYDyDpdxK9kGMCpJLqESEJiH',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        agent_id: "eb4d36d3-1a7e-4be4-8ab0-fe3f65fe7d1d",
        toNumber: userPhoneNumber,
        fromNumberId: "d4af3105-129a-4253-a636-aec3782c62a0",
        callAgentId: "cd922dc9-eea6-4b43-878f-cb5cfd67e005"
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

