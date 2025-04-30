import { initiateVapiCall, endVapiCall, getVapiCallStatus } from './vapiService';

type CallEventType = 'transcription' | 'error';
type CallEventHandler = (data: any) => void;

export class VoiceChatService {
  private static instance: VoiceChatService;
  private eventHandlers: Map<CallEventType, CallEventHandler[]>;
  private isCallActive: boolean = false;

  private constructor() {
    this.eventHandlers = new Map();
    
    // Listen for transcription events from Vapi
    document.addEventListener('vapi-transcription', (e: any) => {
      this.emit('transcription', e.detail);
    });

    // Listen for error events
    document.addEventListener('vapi-error', (e: any) => {
      this.emit('error', e.detail);
    });

    // Listen for call status events
    document.addEventListener('call-started', () => {
      this.isCallActive = true;
    });

    document.addEventListener('call-ended', () => {
      this.isCallActive = false;
    });
  }

  public static getInstance(): VoiceChatService {
    if (!VoiceChatService.instance) {
      VoiceChatService.instance = new VoiceChatService();
    }
    return VoiceChatService.instance;
  }

  public on(event: CallEventType, handler: CallEventHandler): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)?.push(handler);
  }

  private emit(event: CallEventType, data: any): void {
    this.eventHandlers.get(event)?.forEach(handler => handler(data));
  }

  public async startCall(): Promise<void> {
    try {
      await initiateVapiCall();
    } catch (error) {
      this.emit('error', error);
      throw error;
    }
  }

  public async endCall(): Promise<void> {
    try {
      await endVapiCall();
      this.isCallActive = false;
    } catch (error) {
      this.emit('error', error);
      throw error;
    }
  }

  public async getCallStatus(): Promise<'active' | 'ended' | 'failed'> {
    try {
      const isActive = await getVapiCallStatus();
      return isActive ? 'active' : 'ended';
    } catch (error) {
      this.emit('error', error);
      return 'failed';
    }
  }
}
