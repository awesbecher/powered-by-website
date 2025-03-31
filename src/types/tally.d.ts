
interface Window {
  Tally?: {
    loadEmbeds: () => void;
    openPopup: (formId: string, options?: {
      width?: number;
      hideTitle?: boolean;
      layout?: string;
      ref?: string;
      email?: string;
    }) => void;
  }
  twq?: (command: string, event: string, params?: any) => void;
}
