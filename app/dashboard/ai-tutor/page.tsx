'use client';

import { useState, useEffect, useRef } from 'react';
import BackButton from "@/components/BackButton";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AiTutorHybridPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your AI chemistry tutor. You can type your question below or use the microphone to speak with me.' }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [voiceOutputEnabled, setVoiceOutputEnabled] = useState(true);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSpeechSupported(false);
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const startListening = () => {
    if (!speechSupported) {
      alert('Speech recognition is not supported in this browser. Try Google Chrome.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const speechText = event.results[0][0].transcript;
      setInput(speechText);
      sendMessage(speechText);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const speakText = (text: string) => {
    if (!voiceOutputEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = { role: 'user', content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToSend }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const assistantMessage: Message = { role: 'assistant', content: data.text };
      setMessages((prev) => [...prev, assistantMessage]);
      speakText(data.text);
    } catch (err: any) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Error: ' + err.message }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 h-screen flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <BackButton />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Chemistry Tutor</h1>
          <p className="text-sm text-gray-500">Chat via text or voice</p>
        </div>
        <button
          onClick={() => setVoiceOutputEnabled(!voiceOutputEnabled)}
          className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${
            voiceOutputEnabled ? 'bg-violet-50 text-violet-700 border-violet-200' : 'bg-gray-100 text-gray-600 border-gray-200'
          }`}
        >
          {voiceOutputEnabled ? '🔊 Voice Output: ON' : '🔇 Voice Output: OFF'}
        </button>
      </div>

      {/* Chat History Window */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                msg.role === 'user'
                  ? 'bg-violet-600 text-white rounded-br-none'
                  : 'bg-white border border-gray-200 text-gray-900 rounded-bl-none'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 text-sm text-gray-400 animate-pulse">
              AI Tutor is thinking...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Bar (Text + Mic + Send) */}
      <div className="bg-white border border-gray-200 rounded-2xl p-2 shadow-sm flex items-center gap-2">
        <button
          onClick={startListening}
          disabled={isListening || loading}
          className={`p-3 rounded-xl transition-all ${
            isListening
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
          title="Click to speak"
        >
          {isListening ? '🎙️' : '🎤'}
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
          placeholder="Type your chemistry question or click mic..."
          className="flex-1 px-3 py-2 text-sm focus:outline-none text-gray-900"
        />

        <button
          onClick={() => sendMessage(input)}
          disabled={loading || !input.trim()}
          className="bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}