import React, { useState, useEffect, useRef } from 'react';
import { Icon } from './Icon';

export const RecordChatbot = ({ record }) => {
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Initialize or reset chat whenever the record changes
  useEffect(() => {
    if (record) {
      setMessages([
        {
          id: 'welcome-1',
          sender: 'bot',
          text: `Hello! I'm your Polar Nexus AI Assistant. Ask me anything about **${record.title}**!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [record?.id]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!record) return null;

  const quickPrompts = [
    "Key Findings",
    "Measured Parameters",
    "Expedition Location",
    "Student Summary"
  ];

  const generateAIResponse = (userText) => {
    const textLower = userText.toLowerCase();

    // 1. Parameters / Data
    if (textLower.includes('parameter') || textLower.includes('data') || textLower.includes('format') || textLower.includes('measure')) {
      const npdcId = record.npdcDatasetId || 'NPDC-DS-2022-GLAC-041';
      return `📊 **Data & Parameters for this Record:**\n\n• **NPDC ID:** ${npdcId}\n• **Measured Parameters:** ${record.parametersCount || 'Stable Isotopes, Firn Density, Core Depth'}\n• **Lead Institution:** ${record.institution}\n• **Data Formats:** CSV, NetCDF-4, GeoTIFF\n\nAll dataset files are verified by NCPOR data managers.`;
    }

    // 2. Expedition / Location / Station / Lead
    if (textLower.includes('expedition') || textLower.includes('location') || textLower.includes('where') || textLower.includes('station') || textLower.includes('institution') || textLower.includes('led') || textLower.includes('who')) {
      return `📍 **Expedition & Site Context:**\n\n• **Expedition:** ${record.expeditionName}\n• **Region:** ${record.region}\n• **Location:** ${record.location}\n• **Observation Period:** ${record.date}\n• **Lead Institution:** ${record.institution}`;
    }

    // 3. Student / Simple Explainer / Layman
    if (textLower.includes('student') || textLower.includes('simple') || textLower.includes('easy') || textLower.includes('explain') || textLower.includes('layman')) {
      const studentSummary = record.aiDraft?.studentSummary || record.description;
      const takeaways = record.aiDraft?.keyTakeaways || [
        "High-altitude and polar regions provide crucial baseline data for climate models.",
        "Precision sampling enables tracking of long-term environmental changes.",
        "Multidisciplinary collaboration strengthens Indian polar research impact."
      ];
      return `💡 **Simplified Student Explainer:**\n\n${studentSummary}\n\n**Top Takeaways:**\n${takeaways.map((t, idx) => `${idx + 1}. ${t}`).join('\n')}`;
    }

    // 4. Key Findings / Summary / Abstract
    if (textLower.includes('finding') || textLower.includes('summary') || textLower.includes('abstract') || textLower.includes('result') || textLower.includes('about')) {
      const abstractText = record.abstract || record.description;
      return `🔬 **Scientific Findings Summary:**\n\n${abstractText}\n\n**Publication DOI:** ${record.doi || "Technical Expedition Report (MoES/NCPOR)"}`;
    }

    // 5. Default contextual answer
    return `ℹ️ **Information on "${record.title}":**\n\nThis record documents research conducted under **${record.expeditionName}** in the **${record.region}** region (${record.location}).\n\n• **Abstract Overview:** ${record.description}\n• **Verification Status:** ${record.status} by ${record.institution}\n\nFeel free to ask about measured parameters, expedition site details, or simplified explainers!`;
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    // Simulate natural AI thinking delay
    setTimeout(() => {
      const botResponseText = generateAIResponse(query);
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-[520px]">
      {/* Header */}
      <div className="p-3.5 bg-gradient-to-r from-blue-900 via-sky-900 to-slate-900 text-white flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">

          <div>
            <h3 className="font-bold text-xs leading-tight flex items-center gap-1.5">
              PolarAI Assistant
            </h3>
            <p className="text-[10px] text-sky-200 leading-none truncate max-w-[190px]">
              Ask anything about this record
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: `welcome-${Date.now()}`,
                sender: 'bot',
                text: `Chat reset. What would you like to know about **${record.title}**?`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]);
          }}
          className="text-[10px] text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors"
          title="Clear chat"
        >
          Reset
        </button>
      </div>

      {/* Quick Prompts Bar */}
      <div className="bg-slate-50 px-3 py-2 border-b border-slate-200 flex flex-wrap gap-1 text-[11px]">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSendMessage(prompt)}
            className="px-2 py-0.5 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 rounded text-[10px] font-medium transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-50/40 text-xs">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] p-3 rounded-xl text-xs leading-relaxed ${isUser
                  ? 'bg-blue-600 text-white rounded-br-xs shadow-2xs'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-2xs'
                  }`}
              >
                {!isUser && (
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] font-bold text-blue-600 border-b border-slate-100 pb-1">
                    <span>PolarAI Assistant</span>
                  </div>
                )}
                <div className="whitespace-pre-wrap">
                  {msg.text.split('\n').map((line, idx) => {
                    // Simple formatting for bold text **
                    const parts = line.split(/(\*\*.*?\*\*)/g);
                    return (
                      <p key={idx} className={idx > 0 ? 'mt-1' : ''}>
                        {parts.map((part, pIdx) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
                          }
                          return part;
                        })}
                      </p>
                    );
                  })}
                </div>
              </div>
              <span className="text-[9px] text-slate-400 mt-0.5 px-1">
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex flex-col items-start">
            <div className="bg-white text-slate-500 border border-slate-200 p-2.5 rounded-xl rounded-bl-xs text-xs flex items-center gap-2">
              <Icon name="sparkles" size={14} className="text-amber-500 animate-spin" />
              <span className="text-[11px] font-medium text-slate-600">PolarAI is searching record details...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-2.5 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-1.5"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask about "${record.title.slice(0, 22)}..."`}
            className="flex-1 py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-lg transition-colors flex items-center justify-center shrink-0"
            title="Send query"
          >
            <Icon name="search" size={15} />
          </button>
        </form>
        <p className="text-[9px] text-slate-400 text-center mt-1">
          Instant Q&A contextualized to this specific scientific record
        </p>
      </div>
    </div>
  );
};
