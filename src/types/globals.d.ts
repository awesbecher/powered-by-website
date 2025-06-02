
interface Window {
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
