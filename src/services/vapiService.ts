
export const initiateVapiCall = async (userPhoneNumber: string) => {
  try {
    console.log('Initiating Vapi call with phone number:', userPhoneNumber);
    
    const response = await fetch('https://api.vapi.ai/call', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer vapi_60b1f3cd6c0a4903a0a3239ddbcc8d18',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        assistant_id: "65f04f3b164a4efcae0e8533", // Replace with your assistant ID
        customer: {
          phone_number: `+1${userPhoneNumber}`
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response from Vapi API:', errorData);
      throw new Error(errorData.message || 'Failed to initiate call');
    }

    const data = await response.json();
    console.log('Call initiated successfully:', data);
    return data;

  } catch (error) {
    console.error('Error in initiateVapiCall:', error);
    throw error;
  }
};
