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
