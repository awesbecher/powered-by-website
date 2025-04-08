
declare global {
  interface Window {
    Tally: Tally;
    Calendly: any; // Using any for simplicity, could be typed more strictly if needed
  }
}

interface Tally {
  loadEmbeds: () => void;
  openPopup: (formId: string, options?: PopupOptions) => void;
}

interface PopupOptions {
  width?: number;
  height?: number;
  alignLeft?: boolean;
  hideTitle?: boolean;
  hideCloseButton?: boolean;
  emoji?: string;
  customFormUrl?: string;
  hiddenFields?: Record<string, string>;
  shareGaInstance?: boolean;
  layout?: string;
  onOpen?: () => void;
  onClose?: () => void;
}

export {};
