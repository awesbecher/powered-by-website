
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const voices = [
  { id: "tara", name: "Tara" },
  { id: "leo", name: "Leo" },
  { id: "mia", name: "Mia" },
  { id: "nova", name: "Nova" },
]

export const VoiceSelector = () => {
  const handleVoiceChange = (value: string) => {
    window.pageState = {
      ...window.pageState,
      voiceChoice: value
    }
    // Dispatch event to notify other components
    window.dispatchEvent(new Event('pageStateUpdated'))
  }

  return (
    <div className="w-full max-w-md mx-auto mb-4">
      <Select defaultValue="tara" onValueChange={handleVoiceChange}>
        <SelectTrigger className="w-full bg-white/5 border-white/10 text-white">
          <SelectValue placeholder="Choose voice" />
        </SelectTrigger>
        <SelectContent className="bg-[#1a0b2e] border-white/10">
          {voices.map((voice) => (
            <SelectItem 
              key={voice.id} 
              value={voice.id}
              className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white"
            >
              {voice.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
