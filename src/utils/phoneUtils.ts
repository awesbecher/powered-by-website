
export const formatPhoneNumber = (number: string) => {
  // Remove all non-digit characters
  const cleaned = number.replace(/\D/g, '');
  
  // Remove leading "1" if present
  const withoutCountryCode = cleaned.startsWith('1') ? cleaned.slice(1) : cleaned;
  
  // Check if it's exactly 10 digits
  if (withoutCountryCode.length !== 10) {
    throw new Error('Phone number must be 10 digits');
  }
  
  return withoutCountryCode;
};
