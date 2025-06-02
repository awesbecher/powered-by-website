import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Headphones, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DemoCallBlockProps {
  title: string;
  subtitle: string;
  onStartCall: () => void;
}

const DemoCallBlock = ({ title, subtitle, onStartCall }: DemoCallBlockProps) => {
  return (
    <Card className="bg-[#222222] border-gray-800 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Headphones className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-3xl font-bold text-white mb-2">(732) 638 0513</p>
        <p className="text-white/80 text-sm mb-6">
          Call now to talk live to dealer rep at Mercedes of Tacoma
        </p>
        <div className="space-y-4">
          <Button
            onClick={onStartCall}
            className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
          >
            <Phone className="mr-2 h-4 w-4" />
            Speak with us Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoCallBlock;
