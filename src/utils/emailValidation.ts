
// List of common personal email domains
export const personalEmailDomains = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'icloud.com',
  'protonmail.com',
  'mail.com',
  'zoho.com',
  'yandex.com',
  'live.com',
  'msn.com'
];

export const isPersonalEmail = (email: string) => {
  const domain = email.split('@')[1];
  return personalEmailDomains.includes(domain?.toLowerCase());
};

export const isValidEmail = (email: string) => {
  // RFC 5322 compliant email regex
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    return false;
  }

  // Check for common mistakes
  if (email.includes('..')) return false; // Double dots
  if (email.startsWith('.') || email.endsWith('.')) return false; // Leading/trailing dots
  if (email.split('@').length !== 2) return false; // Multiple @ symbols
  
  return true;
};
