
/**
 * Validates if a string is a properly formatted email address
 * @param email - Email address to validate
 * @returns true if email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Checks if an email is from a personal domain
 * @param email - Email address to validate
 * @returns true if email is from a personal domain, false otherwise
 */
export function isPersonalEmail(email: string): boolean {
  const personalDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'aol.com', 'icloud.com', 'protonmail.com', 'mail.com'];
  const domain = email.split('@')[1]?.toLowerCase();
  return personalDomains.includes(domain);
}
