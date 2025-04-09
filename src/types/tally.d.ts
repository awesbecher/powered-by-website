
interface TallyPopupOptions {
  width?: number;
  height?: number;
  hideTitle?: boolean;
  layout?: string;
  alignLeft?: boolean;
  hideCloseButton?: boolean;
  emoji?: string;
  customFormUrl?: string;
  hiddenFields?: Record<string, string>;
  shareGaInstance?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

interface Tally {
  loadEmbeds: () => void;
  openPopup: (formId: string, options?: TallyPopupOptions) => void;
}

declare global {
  interface Window {
    Tally: Tally;
    Calendly?: any; // Added for Calendly integration
  }
}

export {};
