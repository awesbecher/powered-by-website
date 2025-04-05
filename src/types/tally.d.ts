
interface Window {
  Tally?: {
    loadEmbeds: () => void;
    openPopup: (formId: string, options?: {
      width?: number;
      height?: number;
      hideTitle?: boolean;
      layout?: string;
      ref?: string;
      email?: string;
    }) => void;
  }
  twq?: (command: string, event: string, params?: any) => void;
}

// Define TallyEvent interface for form submission events
interface TallyEvent {
  type: string;
  data?: any;
}
