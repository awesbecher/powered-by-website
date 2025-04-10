
declare namespace Tally {
  interface TallyOptions {
    width?: number;
    height?: number;
    hideHeaders?: boolean;
    hideTitle?: boolean;
    layout?: string;
    transparent?: boolean;
    transparentBackground?: boolean;
    autoOpen?: boolean;
    alignLeft?: boolean;
    dynamicHeight?: boolean;
  }

  interface Tally {
    loadEmbeds: () => void;
    openPopup: (formId: string, options?: TallyOptions) => void;
  }
}

interface Window {
  Tally?: Tally.Tally;
  Calendly?: {
    initBadgeWidget: (options: {
      url: string;
      text: string;
      color: string;
      textColor: string;
    }) => void;
    initPopupWidget: (options: {
      url: string;
    }) => void;
  };
}
