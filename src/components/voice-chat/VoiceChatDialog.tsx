
import { VoiceChatDialog as SharedVoiceChatDialog } from "@/components/home/VoiceChatDialog";

export const VoiceChatDialog = (props: React.ComponentProps<typeof SharedVoiceChatDialog>) => {
  return <SharedVoiceChatDialog {...props} source="voice-chat" />;
};
