
declare namespace Tally {
  interface TallyOptions {
    width?: number;
    height?: number;
    hideHeaders?: boolean;
    layout?: string;
    transparent?: boolean;
    autoOpen?: boolean;
  }

  interface Tally {
    loadEmbeds: () => void;
    openPopup: (formId?: string, options?: TallyOptions) => void;
  }

  interface Window {
    Tally: Tally;
  }
}

interface Window {
  Tally?: Tally.Tally;
}
