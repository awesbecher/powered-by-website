
export const isPersonalEmail = (email: string) => {
  const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
  const domain = email.split('@')[1];
  return personalDomains.includes(domain?.toLowerCase());
};
