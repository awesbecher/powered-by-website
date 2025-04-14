
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface FileUploadWithContextProps {
  user: { id: string } | null;
}

const FileUploadWithContext: React.FC<FileUploadWithContextProps> = ({ user }) => {
  const [uploadedText, setUploadedText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const extractTextFromFile = async (file: File) => {
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target && typeof e.target.result === 'string') {
          const text = e.target.result;
          setUploadedText(text);

          // Save text to Supabase if user is logged in
          if (user?.id) {
            const { error } = await supabase.from("agent_docs").insert({
              user_id: user.id,
              raw_text: text,
              filename: file.name,
            });
            
            if (error) {
              toast({
                title: "Error uploading file",
                description: error.message,
                variant: "destructive",
              });
            } else {
              toast({
                title: "File uploaded",
                description: `Successfully saved ${file.name} to your knowledge base.`,
              });
            }
          } else {
            toast({
              title: "Not logged in",
              description: "File loaded locally only. Sign in to save permanently.",
              variant: "destructive",
            });
          }
        }
      };

      reader.readAsText(file);
    } catch (error) {
      toast({
        title: "Error uploading file",
        description: "There was a problem processing your file.",
        variant: "destructive",
      });
      console.error("File upload error:", error);
    }
  };

  const handleChat = async () => {
    if (!userInput.trim()) return;
    
    setLoading(true);
    try {
      const context = uploadedText.slice(0, 2000); // limit context if large
      const updated: Message[] = [...messages, { role: "user", content: userInput }];
      setMessages(updated);
      
      // Call the Supabase Edge Function instead of directly calling OpenAI
      const { data, error } = await supabase.functions.invoke("get-context-chat", {
        body: {
          context: context,
          messages: updated
        }
      });
      
      if (error) throw error;
      
      if (data && data.reply) {
        const assistantReply: Message = { role: "assistant", content: data.reply };
        setMessages([...updated, assistantReply]);
      }
      
      setUserInput("");
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleChat();
    }
  };

  return (
    <Card className="border border-white/10 bg-gradient-to-br from-[#1a0b2e]/70 to-[#2f1c4a]/70 shadow-xl rounded-xl overflow-hidden">
      <CardHeader className="border-b border-white/10 bg-gradient-to-r from-[#2f1c4a] to-[#1a0b2e]">
        <CardTitle className="text-white flex items-center gap-2">
          <span className="bg-[#9b87f5]/20 p-1 rounded-md">📁</span>
          Knowledge Base Chat
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-white">Upload Knowledge Base</h3>
          <Input 
            type="file" 
            accept=".txt,.md,.json"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                extractTextFromFile(e.target.files[0]);
              }
            }}
            className="bg-gray-700/50 border-gray-600"
          />
          {uploadedText && (
            <p className="text-sm text-green-400">
              ✅ File loaded ({uploadedText.length} characters)
            </p>
          )}
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-medium text-white">Chat</h4>
          <div className="bg-gray-800/50 rounded-md p-4 min-h-[200px] max-h-[400px] overflow-y-auto space-y-3">
            {messages.length === 0 ? (
              <p className="text-gray-400 italic">No messages yet. Upload a file and ask a question.</p>
            ) : (
              messages.map((m, i) => (
                <div key={i} className={`${m.role === 'user' ? 'text-blue-300' : 'text-green-300'}`}>
                  <span className="font-bold">{m.role === 'user' ? 'You: ' : 'Assistant: '}</span>
                  {m.content}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about your document..."
            className="bg-gray-700/50 border-gray-600 flex-1"
            disabled={loading || !uploadedText}
          />
          <Button 
            onClick={handleChat} 
            disabled={loading || !uploadedText || !userInput.trim()}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {loading ? "Loading..." : "Send"}
          </Button>
        </div>
        
        {!uploadedText && (
          <p className="text-yellow-300 text-sm">Please upload a file first.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUploadWithContext;
