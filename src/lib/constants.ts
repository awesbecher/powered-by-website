interface ServiceContent {
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  logo: string;
  logoAlt: string;
  callMessage: string;
}

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  realEstate: {
    name: 'Jeff Smith',
    description: 'Speak to Jeff Smith at Township Real Estate! He can help you explore our available properties, schedule viewings, discuss your real estate requirements, and answer any other questions.',
    image: '/assets/team/jeff-smith.jpg',
    imageAlt: 'Jeff Smith - Real Estate Agent',
    logo: '/assets/team/township-realestate.png',
    logoAlt: 'Township Real Estate Logo',
    callMessage: 'Connecting you with Jeff Smith at Township Real Estate...'
  },
  roomService: {
    name: 'Room Service',
    description: 'Welcome to Room Service at Powered By! Our AI assistant is ready to take your order, answer questions about our menu, and ensure you have a delightful dining experience.',
    image: '/assets/images/room-service.jpg',
    imageAlt: 'Room Service',
    logo: '/assets/images/powered-by-logo.png',
    logoAlt: 'Powered By Logo',
    callMessage: 'Connecting you with Room Service...'
  },
  retail: {
    name: 'Alex @ Flagship Barbers',
    description: 'Speak with Alex at Flagship Barbers! Book your next appointment, learn about our services, or ask any questions about our premium barbershop experience.',
    image: '/assets/team/alex.jpg',
    imageAlt: 'Alex - Flagship Barbers',
    logo: '/assets/team/flagship-barbers.png',
    logoAlt: 'Flagship Barbers Logo',
    callMessage: 'Connecting you with Alex at Flagship Barbers...'
  },
  general: {
    name: 'Michael @ Powered_by',
    description: 'Michael is our AI agent and is designed to help you learn more about AI agents and how they can be used within your business. Click the button below to start a live voice chat. Please ensure your computer\'s mic and speaker are enabled.\n\nAsk Michael about anything pertaining to AI Agents, how they work, use cases, or AI best practices.',
    image: '/assets/team/Michael.jpg',
    imageAlt: 'Michael - AI Agent',
    logo: '/assets/team/PWB-favicon.png',
    logoAlt: 'Powered By Logo',
    callMessage: 'Connecting you with Michael...'
  }
};
