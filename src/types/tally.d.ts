
interface TallyPopupOptions {
  width?: number;
  height?: number;
  hideTitle?: boolean;
  layout?: string;
}

interface Tally {
  loadEmbeds: () => void;
  openPopup: (formId: string, options?: TallyPopupOptions) => void;
}

declare global {
  interface Window {
    Tally: Tally;
  }
}

export {};
