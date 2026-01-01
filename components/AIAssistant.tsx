
import React, { useState, useRef, useEffect } from 'react';
import { aiService } from '../services/api';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm Rajkumar's AI assistant. I can answer questions about his experience in Banking systems, Apache Fineract, and Spring Boot. How can I help you?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await aiService.chat(input);
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        // Handling potential undefined response from Gemini API
        content: response || "I'm sorry, I couldn't generate a response at the moment. Please try again.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting to my brain right now. Please ensure the API is reachable.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-24 flex flex-col items-center">
      <div className="w-full max-w-3xl flex flex-col h-[75vh] bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-zinc-800 bg-zinc-950/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <div>
              <h3 className="font-bold text-zinc-100">AI Portfolio Agent</h3>
              <p className="text-xs text-zinc-500">Powered by Gemini</p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          ref={scrollRef}
          className="flex-grow p-4 space-y-4 overflow-y-auto"
        >
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-tr-none' 
                    : 'bg-zinc-800 text-zinc-200 rounded-tl-none border border-zinc-700'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-zinc-800 p-4 rounded-2xl rounded-tl-none border border-zinc-700">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-zinc-950/50 border-t border-zinc-800">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me something about Rajkumar..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-3 px-5 pr-12 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-zinc-100"
            />
            <button 
              onClick={handleSend}
              disabled={isTyping}
              className={`absolute right-2 p-2 rounded-full transition-colors ${
                input.trim() && !isTyping ? 'text-emerald-500' : 'text-zinc-600'
              }`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
