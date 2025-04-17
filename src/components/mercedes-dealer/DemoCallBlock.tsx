
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Headphones } from "lucide-react";

interface DemoCallBlockProps {
  className?: string;
}

const DemoCallBlock = ({ className }: DemoCallBlockProps) => {
  return (
    <Card className={`border border-[#9b87f5]/30 bg-[#1a0b2e]/40 shadow-lg ${className}`} id="demo-call">
      <CardHeader className="pb-2 text-center">
        <CardTitle className="text-white flex items-center justify-center gap-2">
          <Headphones className="h-6 w-6 text-[#9b87f5]" />
          🎧 Hear the AI in Action
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-3xl font-bold text-white mb-2">+1 (732) 638 0513</p>
        <p className="text-white/80 text-sm">
          Call now to hear a real example of our AI answering system.
        </p>
      </CardContent>
    </Card>
  );
};

export default DemoCallBlock;
