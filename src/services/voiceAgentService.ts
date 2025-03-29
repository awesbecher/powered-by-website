
// Main voice agent service that integrates all the specialized services
import { supportedLanguages } from './voice-agent/types';
import { transcriptionService } from './voice-agent/transcriptionService';
import { knowledgeService } from './voice-agent/knowledgeService';
import { responseService } from './voice-agent/responseService';
import { speechService } from './voice-agent/speechService';
import { loggingService } from './voice-agent/loggingService';

// Re-export the supported languages for external use
export { supportedLanguages };

// This service handles the integration with external APIs
export const voiceAgentService = {
  // Re-export services for external use
  transcribeSpeech: transcriptionService.transcribeSpeech,
  queryKnowledgeBase: knowledgeService.queryKnowledgeBase,
  generateResponse: responseService.generateResponse,
  generateSpeech: speechService.generateSpeech,
  logConversation: loggingService.logConversation
};
