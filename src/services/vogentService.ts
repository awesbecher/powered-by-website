
const FLOW_ID = "cd922dc9-eea6-4b43-878f-cb5cfd67e005";
const AGENT_ID = "53660ead-9260-4a23-8df2-55a7050b3340";

export const initiateVogentCall = async () => {
  try {
    const response = await fetch("https://api.vogent.ai/flow/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.VOGENT_API_KEY || "",
      },
      body: JSON.stringify({
        flowId: FLOW_ID,
        agentId: AGENT_ID,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to initiate Vogent call");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error initiating Vogent call:", error);
    throw error;
  }
};
