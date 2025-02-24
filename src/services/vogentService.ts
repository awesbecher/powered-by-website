
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
        agent_id: "4b2d92b5-d58a-45a1-8e46-9aab39c99ae5",
        toNumber: userPhoneNumber,
        fromNumberId: "0a2a5209-0a45-415b-955d-4ed9540390ce",
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

