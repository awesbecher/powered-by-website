export const PLAYHT_CONFIG = {
  userId: '16zUlybb44eMncP6s4b2WP7pwby1',
  secretKey: 'ak-6fddb38853cf46aaba7ff7a50f44b712',
  agentId: 'Chris-Cambridge-Wigagb2b9pwC1a_jVeLTj'
};

let isCallActive = false;

export async function startCall(): Promise<void> {
  if (isCallActive) {
    await stopCall();
  }
  isCallActive = true;
  console.log('PlayHT call started');
}

export async function stopCall(): Promise<void> {
  isCallActive = false;
  console.log('PlayHT call stopped');
}

export function getCallStatus(): boolean {
  return isCallActive;
}
