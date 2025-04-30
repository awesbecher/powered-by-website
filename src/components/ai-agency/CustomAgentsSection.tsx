import React from 'react';
import { Container } from '@/components/ui/container';
import { Brain, Layers, Palette } from 'lucide-react';

const features = [
  {
    title: 'Knows Your Playbook',
    description: 'We feed your FAQs, call transcripts, CRM notes, and SOPs directly into the model, so the agent answers like your best employee—not a generic chatbot.',
    icon: Brain
  },
  {
    title: 'Omni-channel from Day One',
    description: 'Voice, chat, email, and SMS run off the same brain. Customers hop channels; context follows automatically.',
    icon: Layers
  },
  {
    title: 'Brand-Tuned Personality',
    description: 'Choose a pre-built voice or spin up a bespoke tone that matches your brand\'s vibe. If you rebrand, the AI rebrands with you—no hard-coded scripts to rewrite.',
    icon: Palette
  }
];

export function CustomAgentsSection() {
  return (
    <div className="relative overflow-hidden bg-black">
      <Container>
        <div className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-[#6342ff] to-[#9b87f5] bg-clip-text text-transparent">
                Custom Trained AI Agents for your Business
              </h2>
              <div className="h-1.5 w-64 mx-auto mt-2 bg-gradient-to-r from-[#6342ff] to-[#9b87f5] rounded-full opacity-75" />
            </div>
            <div className="mx-auto mt-8 max-w-2xl sm:mt-12 lg:mt-16 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-12 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {features.map((feature, index) => (
                  <div 
                    key={feature.title} 
                    className="relative group hover:scale-105 transition-transform duration-300 ease-out"
                  >
                    <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-[#6342ff]/10 to-[#9b87f5]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex flex-col">
                      <div className="mb-6">
                        <div className="rounded-lg bg-[#6342ff]/20 p-3 w-12 h-12 flex items-center justify-center">
                          <feature.icon className="h-6 w-6 text-[#9b87f5]" />
                        </div>
                      </div>
                      <dt className="text-2xl font-semibold leading-7 text-white group-hover:text-[#9b87f5] transition-colors duration-300">
                        {feature.title}
                      </dt>
                      <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-400">
                        <p className="flex-auto">{feature.description}</p>
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
