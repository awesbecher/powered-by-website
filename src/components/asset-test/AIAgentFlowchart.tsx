
import React from "react";

const AIAgentFlowchart = () => {
  return (
    <div className="w-full max-w-5xl mx-auto my-12 p-6 rounded-2xl bg-gradient-to-br from-white to-[#D3E4FD] shadow-xl">
      <div className="relative w-full aspect-[16/9]">
        {/* Background tech patterns */}
        <div className="absolute inset-0 opacity-5 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Binary code pattern */}
            <div className="absolute top-10 left-10 text-[8px] text-gray-700 font-mono opacity-20">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="mb-1">
                  {Array.from({ length: 30 }).map((_, j) => (
                    <span key={j}>{Math.round(Math.random())}</span>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Circuit pattern */}
            <div className="absolute bottom-10 right-10">
              <svg width="150" height="150" viewBox="0 0 100 100" className="opacity-10">
                <path d="M10,30 L90,30" stroke="#333" strokeWidth="0.5" fill="none" />
                <path d="M10,50 L90,50" stroke="#333" strokeWidth="0.5" fill="none" />
                <path d="M10,70 L90,70" stroke="#333" strokeWidth="0.5" fill="none" />
                <path d="M30,10 L30,90" stroke="#333" strokeWidth="0.5" fill="none" />
                <path d="M50,10 L50,90" stroke="#333" strokeWidth="0.5" fill="none" />
                <path d="M70,10 L70,90" stroke="#333" strokeWidth="0.5" fill="none" />
                <circle cx="30" cy="30" r="3" fill="#333" className="opacity-50" />
                <circle cx="50" cy="50" r="3" fill="#333" className="opacity-50" />
                <circle cx="70" cy="70" r="3" fill="#333" className="opacity-50" />
                <circle cx="30" cy="70" r="3" fill="#333" className="opacity-50" />
                <circle cx="70" cy="30" r="3" fill="#333" className="opacity-50" />
              </svg>
            </div>
          </div>
        </div>

        {/* Flowchart content */}
        <div className="relative grid grid-cols-2 gap-8 h-full">
          {/* AI Agent 1: Phone Call */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-[200px] aspect-square bg-white rounded-full shadow-lg p-4 mb-3 relative overflow-hidden">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f1f5ff] to-[#e1ebfd]"></div>
              <div className="relative z-10 h-full flex flex-col items-center justify-center">
                {/* Robot with headset */}
                <div className="w-24 h-24 bg-[#1EAEDB] rounded-full mx-auto mb-2 relative">
                  {/* Robot face */}
                  <div className="absolute inset-[15%] bg-[#f1f5ff] rounded-full">
                    <div className="absolute top-[30%] left-[20%] w-[15%] h-[15%] rounded-full bg-[#1EAEDB]"></div>
                    <div className="absolute top-[30%] right-[20%] w-[15%] h-[15%] rounded-full bg-[#1EAEDB]"></div>
                    <div className="absolute bottom-[30%] left-[35%] right-[35%] h-[10%] rounded-full bg-[#1EAEDB]"></div>
                  </div>
                  {/* Headset */}
                  <div className="absolute top-0 right-0 w-[60%] h-[30%] border-r-[3px] border-[#333] rounded-tr-full"></div>
                  <div className="absolute top-[10%] right-[-10%] w-[20%] h-[10%] bg-[#333] rounded-full"></div>
                </div>
                {/* Speech bubble */}
                <div className="relative bg-white p-2 rounded-lg shadow-sm border border-gray-200">
                  <div className="absolute top-[-8px] left-[50%] transform translate-x-[-50%] w-4 h-4 bg-white border-t border-l border-gray-200 rotate-45"></div>
                  <p className="text-xs text-center font-medium text-gray-700">Hello, how can I assist you today?</p>
                </div>
              </div>
            </div>
            <h3 className="text-sm font-bold text-gray-800">Phone Support</h3>
          </div>

          {/* AI Agent 2: Email */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-[200px] aspect-square bg-white rounded-full shadow-lg p-4 mb-3 relative overflow-hidden">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f1f5ff] to-[#e1ebfd]"></div>
              <div className="relative z-10 h-full flex flex-col items-center justify-center">
                {/* Robot with laptop */}
                <div className="w-24 h-24 bg-[#0FA0CE] rounded-full mx-auto mb-2 relative">
                  {/* Robot face */}
                  <div className="absolute inset-[15%] bg-[#f1f5ff] rounded-full">
                    <div className="absolute top-[30%] left-[20%] w-[15%] h-[15%] rounded-full bg-[#0FA0CE]"></div>
                    <div className="absolute top-[30%] right-[20%] w-[15%] h-[15%] rounded-full bg-[#0FA0CE]"></div>
                    <div className="absolute bottom-[30%] left-[35%] right-[35%] h-[10%] rounded-full bg-[#0FA0CE]"></div>
                  </div>
                </div>
                {/* Laptop and email icon */}
                <div className="relative">
                  <div className="w-16 h-10 bg-gray-700 rounded-t-md"></div>
                  <div className="w-20 h-2 bg-gray-800 rounded-b-md"></div>
                  {/* Email icon */}
                  <div className="absolute -top-6 -right-6 w-8 h-8 bg-[#F97316] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">@</span>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-sm font-bold text-gray-800">Email Communication</h3>
          </div>

          {/* AI Agent 3: Data Entry */}
          <div className="flex flex-col items-center justify-center mt-12">
            <div className="w-full max-w-[200px] aspect-square bg-white rounded-full shadow-lg p-4 mb-3 relative overflow-hidden">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f1f5ff] to-[#e1ebfd]"></div>
              <div className="relative z-10 h-full flex flex-col items-center justify-center">
                {/* Robot with data */}
                <div className="w-24 h-24 bg-[#8B5CF6] rounded-full mx-auto mb-2 relative">
                  {/* Robot face */}
                  <div className="absolute inset-[15%] bg-[#f1f5ff] rounded-full">
                    <div className="absolute top-[30%] left-[20%] w-[15%] h-[15%] rounded-full bg-[#8B5CF6]"></div>
                    <div className="absolute top-[30%] right-[20%] w-[15%] h-[15%] rounded-full bg-[#8B5CF6]"></div>
                    <div className="absolute bottom-[30%] left-[35%] right-[35%] h-[10%] rounded-full bg-[#8B5CF6]"></div>
                  </div>
                </div>
                {/* Floating data elements */}
                <div className="absolute top-0 left-0 w-8 h-8 bg-white rounded-md shadow-sm border border-gray-200 flex items-center justify-center">
                  <div className="w-5 h-5 bg-green-500 rounded-sm"></div>
                </div>
                <div className="absolute bottom-5 right-5 w-8 h-8 bg-white rounded-md shadow-sm border border-gray-200 flex items-center justify-center">
                  <div className="w-5 h-1 bg-blue-500 rounded-sm"></div>
                  <div className="w-1 h-5 bg-blue-500 rounded-sm absolute"></div>
                </div>
                <div className="absolute top-5 right-5 w-10 h-6 bg-white rounded-md shadow-sm border border-gray-200 flex items-center justify-center">
                  <div className="w-8 h-1 bg-gray-400 rounded-sm mb-1"></div>
                  <div className="w-8 h-1 bg-gray-400 rounded-sm absolute top-4"></div>
                </div>
              </div>
            </div>
            <h3 className="text-sm font-bold text-gray-800">Data Automation</h3>
          </div>

          {/* AI Agent 4: Human Assistant */}
          <div className="flex flex-col items-center justify-center mt-12">
            <div className="w-full max-w-[200px] aspect-square bg-white rounded-full shadow-lg p-4 mb-3 relative overflow-hidden">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f1f5ff] to-[#e1ebfd]"></div>
              <div className="relative z-10 h-full flex flex-col items-center justify-center">
                {/* Robot with human */}
                <div className="w-16 h-16 bg-[#F97316] rounded-full relative">
                  {/* Robot face */}
                  <div className="absolute inset-[15%] bg-[#f1f5ff] rounded-full">
                    <div className="absolute top-[30%] left-[20%] w-[15%] h-[15%] rounded-full bg-[#F97316]"></div>
                    <div className="absolute top-[30%] right-[20%] w-[15%] h-[15%] rounded-full bg-[#F97316]"></div>
                    <div className="absolute bottom-[30%] left-[35%] right-[35%] h-[10%] rounded-full bg-[#F97316]"></div>
                  </div>
                </div>
                
                {/* Human figure */}
                <div className="w-16 h-16 ml-6 mt-2 relative">
                  {/* Human head */}
                  <div className="w-8 h-8 bg-[#F1C27D] rounded-full absolute top-0 left-0"></div>
                  {/* Human body - business suit */}
                  <div className="w-10 h-12 bg-[#333] rounded-md absolute top-6 left-[-1px]"></div>
                  {/* Human expression - relief */}
                  <div className="absolute top-[30%] left-[20%] w-1 h-1 rounded-full bg-[#333]"></div>
                  <div className="absolute top-[30%] left-[60%] w-1 h-1 rounded-full bg-[#333]"></div>
                  <div className="absolute top-[60%] left-[40%] w-4 h-1 rounded-full bg-[#333]"></div>
                </div>
                
                {/* Checklist */}
                <div className="absolute bottom-2 right-2 w-12 h-16 bg-white rounded-md shadow-sm border border-gray-200 flex flex-col items-center justify-center p-1">
                  <div className="w-full h-2 bg-gray-200 rounded-sm mb-1"></div>
                  <div className="w-full h-2 bg-gray-200 rounded-sm mb-1"></div>
                  <div className="w-full h-2 bg-gray-200 rounded-sm mb-1"></div>
                  <div className="w-full bg-green-500 text-[6px] text-white font-bold text-center rounded-sm">DONE</div>
                </div>
              </div>
            </div>
            <h3 className="text-sm font-bold text-gray-800">Task Completion</h3>
          </div>
        </div>

        {/* Connection arrows */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" style={{ pointerEvents: 'none' }}>
          {/* Arrow from Agent 1 to 2 */}
          <path
            d="M 250,150 C 350,100 400,100 500,150"
            fill="none"
            stroke="#F97316"
            strokeWidth="4"
            strokeLinecap="round"
            markerEnd="url(#arrowhead)"
          />
          
          {/* Arrow from Agent 2 to 3 */}
          <path
            d="M 500,200 C 400,250 300,300 250,350"
            fill="none"
            stroke="#F97316"
            strokeWidth="4"
            strokeLinecap="round"
            markerEnd="url(#arrowhead)"
          />
          
          {/* Arrow from Agent 3 to 4 */}
          <path
            d="M 300,350 C 400,400 450,400 500,350"
            fill="none"
            stroke="#F97316"
            strokeWidth="4"
            strokeLinecap="round"
            markerEnd="url(#arrowhead)"
          />
          
          {/* Define the arrowhead marker */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#F97316" />
            </marker>
          </defs>
        </svg>

        {/* Company Logo */}
        <div className="absolute bottom-4 right-4 flex items-center">
          <div className="bg-white text-[#6342ff] font-bold px-2 py-1 rounded-md text-xs font-sans">
            Powered_by
          </div>
          <span className="text-xs ml-1 font-medium text-gray-700">Agency, LLC</span>
        </div>
      </div>
    </div>
  );
};

export default AIAgentFlowchart;
