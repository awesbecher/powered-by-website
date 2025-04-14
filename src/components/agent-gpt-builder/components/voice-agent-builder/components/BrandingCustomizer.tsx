
import React, { useState } from "react";

interface BrandingCustomizerProps {
  agentName: string;
}

const BrandingCustomizer: React.FC<BrandingCustomizerProps> = ({ agentName }) => {
  const [color, setColor] = useState("#0055ff");
  const [greeting, setGreeting] = useState("Hi! I'm your smart assistant 🤖");
  const [theme, setTheme] = useState("light");
  const [position, setPosition] = useState("bottom-right");
  const [logoURL, setLogoURL] = useState("");

  const generateEmbed = () => {
    const snippet = `
<!-- GPT Agent Widget -->
<div id="gpt-agent-widget"></div>
<script 
  src="https://yourdomain.com/widget.js"
  data-agent="${agentName}"
  data-token="your-token"
  data-lang="en-US"
  data-color="${color}"
  data-theme="${theme}"
  data-greeting="${greeting}"
  data-position="${position}"
  ${logoURL ? `data-logo="${logoURL}"` : ""}
></script>
    `;
    navigator.clipboard.writeText(snippet);
    alert("📎 Embed snippet copied to clipboard!");
  };

  return (
    <div className="mt-8">
      <h3 className="text-white font-bold mb-4">🎨 Customize Widget Appearance</h3>

      <div className="mb-4">
        <label className="block text-white mb-2">Brand Color:</label>
        <input 
          type="color" 
          value={color} 
          onChange={(e) => setColor(e.target.value)} 
          className="h-10 w-16 rounded cursor-pointer border-0"
        />
      </div>

      <div className="mb-4">
        <label className="block text-white mb-2">Greeting Message:</label>
        <input
          type="text"
          value={greeting}
          onChange={(e) => setGreeting(e.target.value)}
          placeholder="Welcome message"
          className="w-full p-2 bg-[#1a0b2e]/40 border-white/20 text-white rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-white mb-2">Theme:</label>
        <select 
          value={theme} 
          onChange={(e) => setTheme(e.target.value)}
          className="w-full p-2 bg-[#1a0b2e]/40 border-white/20 text-white rounded"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-white mb-2">Widget Position:</label>
        <select 
          value={position} 
          onChange={(e) => setPosition(e.target.value)}
          className="w-full p-2 bg-[#1a0b2e]/40 border-white/20 text-white rounded"
        >
          <option value="bottom-right">Bottom Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="inline">Inline (inside content)</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-white mb-2">Logo URL (optional):</label>
        <input
          type="text"
          value={logoURL}
          onChange={(e) => setLogoURL(e.target.value)}
          placeholder="https://example.com/logo.png"
          className="w-full p-2 bg-[#1a0b2e]/40 border-white/20 text-white rounded"
        />
      </div>

      <button 
        onClick={generateEmbed}
        className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5] text-white font-medium py-2 px-4 rounded"
      >
        📎 Copy Widget Embed
      </button>
    </div>
  );
};

export default BrandingCustomizer;
