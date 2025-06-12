// src/pages/AthenaChatPage.tsx
import React, { useState } from "react";
import { Send } from "lucide-react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

interface Message {
  sender: "user" | "bot";
  content: string;
}

const quickReplies = [
  "Preciso de dicas para relaxar",
  "Não dormi bem ultimamente",
  "Estou me sentindo ansioso",
  "Como posso melhorar meu humor?",
];

const AthenaChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { sender: "user" as const, content: text }];
    setMessages(newMessages);
    setInput("");

    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) {
        throw new Error('Erro ao conectar à API');
      }

      const data = await response.json();
      const botReply = {
        sender: "bot" as const,
        content: data.response || "Desculpe, houve um erro ao processar sua mensagem."
      };
      setMessages([...newMessages, botReply]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      const errorMessage = {
        sender: "bot" as const,
        content: "Erro ao conectar com o servidor. Tente novamente mais tarde."
      };
      setMessages([...newMessages, errorMessage]);
    }
  };

  return (
    <div className="bg-[#0A0F23] min-h-screen text-white flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12">
        <div className=""></div>
        <h1 className="text-3xl font-semibold mb-1 flex items-center gap-2">
          🧠 Athena IA
        </h1>
        <p className="text-gray-400 mb-8">
          Seu parceiro de chat solidário. Converse sobre qualquer coisa em sua mente.
        </p>

        <div className="space-y-4 mb-6 max-h-[60vh] overflow-y-auto pr-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 text-sm max-w-xs ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-[#E6F0FF] text-black"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {quickReplies.map((text, i) => (
            <button
              key={i}
              onClick={() => sendMessage(text)}
              className="bg-transparent border border-blue-400 text-blue-400 text-sm px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition"
            >
              {text}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            placeholder="Digite sua mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-[#0F1A34] border border-gray-600 rounded-md px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-md text-sm transition"
          >
            Enviar
          </button>
        </form>
      </main>
    </div>
  );
};

export default AthenaChatPage;
