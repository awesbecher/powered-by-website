
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Headphones, Phone } from "lucide-react";

interface DemoCallBlockProps {
  className?: string;
}

const DemoCallBlock = ({ className }: DemoCallBlockProps) => {
  return (
    <Card className={`border border-[#9b87f5]/30 bg-[#1a0b2e]/40 shadow-lg mx-auto max-w-md ${className}`} id="demo-call">
      <CardHeader className="pb-2 text-center">
        <CardTitle className="text-white flex items-center justify-center gap-2">
          <Phone className="h-6 w-6 text-[#9b87f5]" />
          Hear It In Action
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-3xl font-bold text-white mb-2">+1 (732) 784 1506</p>
        <p className="text-white/80 text-sm">
          Call now to experience the AI concierge live.
        </p>
      </CardContent>
    </Card>
  );
};

export default DemoCallBlock;
