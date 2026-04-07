"use client"

import { useState } from "react";
import { Send, UserCircle, Bot, Sparkles } from "lucide-react";

export default function CRMChatInterface() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Juggernaut AI Link authorized. Paste the client's email below, and I will mathematically calculate the correct negotiation response using the growth-phase £850 - £2,500 algorithms." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Hardcoded Client Context for UI Demonstration before Supabase Connection
  const activeClient = {
    name: "Dr. Harrison (Private Clinic)",
    budget: "£1,200 (Growth Tier)",
    status: "Negotiating",
    project: "Service Landing Page"
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/brain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // We pass the active client data context to the AI brain
        body: JSON.stringify({ prompt: input, context: activeClient }), 
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (e: any) {
      console.error("Fetch Intercepted Error:", e);
      setMessages((prev) => [...prev, { role: "assistant", content: `ERROR: Comm-Link failure (${e.message}). Ensure you are on the correct port and the API key is active.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full h-[85vh]">
      
      {/* LEFT PANEL: Client Dossier (Connects to Supabase Database later) */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-[#ffffff10] shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600" />
          <h2 className="text-xl font-bold tracking-tight text-white mb-6 flex items-center gap-2">
            <UserCircle className="text-indigo-400" /> Active Dossier
          </h2>
          
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-1">Target Entity</span>
              <span className="text-white font-medium">{activeClient.name}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-1">Stated Budget</span>
              <span className="text-rose-400 font-medium">{activeClient.budget}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-1">Pipeline Vector</span>
              <span className="text-indigo-400 font-medium">{activeClient.project}</span>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-[#ffffff10]">
            <p className="text-xs text-neutral-500 leading-relaxed">
              * The Engine recommends deploying the "Growth Protocol" here. Target budget is within our £850-£2,500 bounds. Prove value, do not arbitrarily discount.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: AI Comm-Link (Gemini Connection) */}
      <div className="w-full lg:w-2/3 flex flex-col rounded-2xl bg-[#0A0A0A] border border-[#ffffff10] shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4">
          <Sparkles size={16} className="text-indigo-500/50" />
        </div>
        
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div 
                className={`max-w-[80%] p-4 rounded-xl text-sm leading-relaxed ${
                  msg.role === "user" 
                  ? "bg-indigo-600/20 text-indigo-50 border border-indigo-500/30 rounded-br-none" 
                  : "bg-[#111111] text-neutral-300 border border-[#ffffff10] rounded-bl-none"
                }`}
              >
                {msg.role === "assistant" && <Bot size={16} className="mb-2 text-indigo-400" />}
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#111111] p-4 rounded-xl border border-[#ffffff10] rounded-bl-none">
                <span className="animate-pulse text-indigo-400 text-sm tracking-widest font-semibold uppercase">Analyzing Matrix...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Boundary */}
        <div className="p-4 bg-[#080808] border-t border-[#ffffff10]">
          <div className="relative flex items-center">
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste the client's email here..."
              className="w-full bg-[#111111] border border-[#ffffff10] rounded-xl pl-4 pr-16 py-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none h-14"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
