"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Send, User, Bot } from "lucide-react"
import { gsap } from "gsap"

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const chatPanelRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi there! I'm Prakhar's assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Toggle chat panel
  const toggleChatPanel = () => {
    setIsOpen(!isOpen)
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessages = [
      ...messages,
      { id: Date.now().toString(), role: "user", content: input },
    ];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, data]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { id: Date.now().toString(), role: "assistant", content: "Sorry, there was an error." },
      ]);
    }
    setIsLoading(false);
  };

  // Animate chat panel
  useEffect(() => {
    if (!chatPanelRef.current) return

    gsap.to(chatPanelRef.current, {
      x: isOpen ? 0 : "100%",
      duration: 0.5,
      ease: "power3.out",
    })
  }, [isOpen])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={toggleChatPanel}
        className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-black border-l border-t border-b border-white/20 p-2 z-40 rounded-l-md hover:bg-white/10 transition-colors"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
      </button>

      {/* Chat panel */}
      <div
        ref={chatPanelRef}
        className="fixed top-0 right-0 w-full sm:w-96 h-full bg-black border-l border-white/20 z-50 transform translate-x-full"
      >
        {/* Chat header */}
        <div className="border-b border-white/20 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Chat with Prakhar</h2>
          <button
            onClick={toggleChatPanel}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close chat"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Chat messages */}
        <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 flex flex-col gap-4">
          {messages.map((msg: { id: string; role: string; content: string }, idx: number) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Bot size={18} />
                </div>
              )}
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === "user" ? "bg-white/10 text-white" : "bg-white/5 text-white"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <User size={18} />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat input */}
        <form
          onSubmit={handleSubmit}
          className="absolute bottom-0 left-0 right-0 border-t border-white/20 p-4 bg-black"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1 bg-white/5 border border-white/20 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-white/30 text-white"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-md transition-colors disabled:opacity-50"
              disabled={isLoading || !input.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
