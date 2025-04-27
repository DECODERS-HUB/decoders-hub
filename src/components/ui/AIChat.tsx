
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, X, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hello! I'm your DecodersHub AI assistant. How can I help you today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

const commonQuestions = [
  "What services do you offer?",
  "How can I book an appointment?",
  "What's your pricing structure?",
  "Do you offer remote consultations?",
];

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-responses based on user input
  const getAutoResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes("appointment") || lowerCaseMessage.includes("book") || lowerCaseMessage.includes("schedule")) {
      return "You can book an appointment by clicking the 'Book Appointment' button on our website or by calling us at +1 (234) 567-890. Would you like me to guide you to the appointment booking page?";
    } else if (lowerCaseMessage.includes("service") || lowerCaseMessage.includes("offer")) {
      return "We offer a range of services including Tech Training, Branding, IT Mentorship, Software Development, and Business Consultancy. Would you like to know more about any specific service?";
    } else if (lowerCaseMessage.includes("price") || lowerCaseMessage.includes("cost") || lowerCaseMessage.includes("fee")) {
      return "Our pricing varies based on the specific services and requirements. We offer customized solutions tailored to your needs. Would you like to speak with one of our consultants to discuss pricing options?";
    } else if (lowerCaseMessage.includes("remote") || lowerCaseMessage.includes("online") || lowerCaseMessage.includes("virtual")) {
      return "Yes, we offer remote consultations and services. Many of our clients prefer this option for convenience. Would you like to learn more about our remote service delivery?";
    } else if (lowerCaseMessage.includes("contact") || lowerCaseMessage.includes("reach")) {
      return "You can reach us via email at info@decodershub.com, by phone at +1 (234) 567-890, or by filling out the contact form on our website. How would you prefer to get in touch?";
    } else if (lowerCaseMessage.includes("location") || lowerCaseMessage.includes("address") || lowerCaseMessage.includes("office")) {
      return "Our main office is located at 123 Business Avenue, Tech City, TC 10011. We also have remote teams available to serve clients globally.";
    } else if (lowerCaseMessage.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with today?";
    } else {
      return "Thank you for your message. Would you like to speak with one of our consultants for more detailed information? You can also book an appointment or send us a message through the contact form.";
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (input.trim() === "") return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate typing delay then add bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getAutoResponse(input),
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    handleSendMessage();
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      toast({
        title: "Chat Assistant Opened",
        description: "Ask us anything about our services!",
      });
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 rounded-full p-4 shadow-lg transition-all ${
          isOpen ? "bg-red-500 rotate-90" : "bg-accent1-400 hover:bg-accent1-500"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white rounded-lg shadow-xl transition-all duration-300 transform ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        } overflow-hidden flex flex-col`}
        style={{ maxHeight: "500px" }}
      >
        {/* Chat header */}
        <div className="bg-brand-700 text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            <div>
              <h3 className="font-medium">DecodersHub Assistant</h3>
              <p className="text-xs text-green-300">Online</p>
            </div>
          </div>
          <button onClick={toggleChat} className="text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: "300px", maxHeight: "350px" }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  msg.sender === "user"
                    ? "bg-brand-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-2 text-gray-800">
                <div className="flex space-x-1 items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Quick questions */}
        <div className="bg-gray-50 p-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">Common questions:</p>
          <div className="flex flex-wrap gap-2">
            {commonQuestions.map((q, i) => (
              <button
                key={i}
                className="text-xs bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1 text-gray-700 transition-colors"
                onClick={() => handleQuickQuestion(q)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
        
        {/* Chat input */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-l-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <Button
            type="submit"
            className="rounded-l-none bg-brand-600 hover:bg-brand-700"
            disabled={input.trim() === ""}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </>
  );
};

export default AIChat;
