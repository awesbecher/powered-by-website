
declare global {
  interface Window {
    Tally: Tally;
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
  hideCloseButton?: boolean;
  emoji?: string;
  customFormUrl?: string;
  hiddenFields?: Record<string, string>;
  shareGaInstance?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export {};
