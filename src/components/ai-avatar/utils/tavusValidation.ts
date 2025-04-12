
/**
 * Utility functions for validating Tavus generation inputs
 */

/**
 * Validates if a script meets Tavus requirements
 */
export const validateTavusScript = (script: string) => {
  const trimmedScript = script.trim();
  const wordCount = trimmedScript.split(' ').length;
  const characterCount = trimmedScript.length;
  
  const isScriptTooLong = characterCount > 10000;
  const isScriptTooShort = wordCount < 10;
  
  return {
    isValid: !isScriptTooLong && !isScriptTooShort,
    isScriptTooLong,
    isScriptTooShort,
    wordCount,
    characterCount
  };
};

/**
 * Gets guidance message for script validation
 */
export const getScriptGuidance = (script: string): string => {
  const { isScriptTooLong, isScriptTooShort } = validateTavusScript(script);
  
  if (isScriptTooLong) return "Script is too long. Please reduce to 10,000 characters or less.";
  if (isScriptTooShort) return "Script should contain at least a few complete sentences.";
  return "";
};
