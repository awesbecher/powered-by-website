
// Define the WebkitSpeechRecognition type
interface webkitSpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: any) => void;
  onerror: (event: any) => void;
  onend: () => void;
  onspeechstart: (event: any) => void;
  onspeechend: (event: any) => void;
  onstart: (event: any) => void;
  onnomatch: (event: any) => void;
  onaudiostart: (event: any) => void;
  onaudioend: (event: any) => void;
  onsoundstart: (event: any) => void;
  onsoundend: (event: any) => void;
}

interface Window {
  webkitSpeechRecognition: {
    new (): webkitSpeechRecognition;
    prototype: webkitSpeechRecognition;
  };
}
