// src/pages/AthenaChatPage.tsx
import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header/Header";
import Coracao from "../../public/images/Athena.svg"

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
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      content: "Olá! Eu sou a Athena, sua companheira de conversa. Estou aqui para ouvir, apoiar e ajudar você a refletir sobre suas emoções. Como posso ajudar você hoje?"
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Função para fazer scroll automático para a última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Função para formatar a resposta da IA
  const formatAIResponse = (response: string): string => {
    // Converte texto entre asteriscos para negrito (mantém os asteriscos para depois processar no JSX)
    let formatted = response
      .replace(/(\d+\.\s)/g, '\n$1') // Quebra antes de números (1., 2., etc.)
      .replace(/(•\s)/g, '\n$1') // Quebra antes de bullets
      .replace(/(-\s)/g, '\n$1') // Quebra antes de hífens
      .replace(/(\*\s)/g, '\n• ') // Substitui asteriscos por bullets preenchidos
      .replace(/(\n\s*\n)/g, '\n\n') // Remove espaços extras entre parágrafos
      .trim();

    // Adiciona quebras de linha antes de frases que começam com palavras específicas
    const keywords = ['Primeiro', 'Segundo', 'Terceiro', 'Além disso', 'Por outro lado', 'No entanto', 'Por exemplo', 'Em resumo', 'Lembre-se'];
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      formatted = formatted.replace(regex, `\n${keyword}`);
    });

    return formatted;
  };

  // Efeito para fazer scroll automático sempre que as mensagens mudarem
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { sender: "user" as const, content: text }];
    setMessages(newMessages);
    setInput("");

    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('Faça login para conversar com a Athena');
      }

      const response = await fetch('https://mindtrack-api.onrender.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) {
        if (response.status === 500) {
          throw new Error('Serviço temporariamente indisponível');
        }
        throw new Error('Erro ao conectar à API');
      }

      const data = await response.json();
      if (!data.response) {
        throw new Error('Resposta inválida do servidor');
      }

      const botReply = {
        sender: "bot" as const,
        content: formatAIResponse(data.response)
      };
      setMessages([...newMessages, botReply]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      const errorMessage = {
        sender: "bot" as const,
        content: error instanceof Error ? error.message : "Nesse momento a Athena não pode te responder, tente novamente mais tarde."
      };
      setMessages([...newMessages, errorMessage]);
    }
  };

  return (
<div className="bg-to-bottom-gradient min-h-screen text-white flex flex-col">
      <div className="z-50">
        <Header />
      </div>
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 pt-5 pb-1 relative">
        <div className="flex gap-4 items-center mb-2">
          <img src={Coracao} alt="" className="w-8 h-8" />
          <h1 className="text-3xl font-semibold">Athena IA</h1>
        </div>
        <p className="text-gray-400 mb-6">
          Seu parceiro de chat solidário. Converse sobre qualquer coisa em sua
          mente.
        </p>

        {/* Chat box */}
        <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-340px)] pr-2 custom-scrollbar">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`
                px-4 py-3 text-sm max-w-xs md:max-w-md lg:max-w-lg break-words leading-relaxed
                ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-lg rounded-br-none"
                    : "bg-[#E6F0FF] text-black rounded-lg rounded-bl-none shadow-sm"
                }
              `}
              >
                {msg.sender === "bot" ? (
                  <div className="whitespace-pre-wrap">
                    {msg.content.split('\n').map((line, index) => {
                      // Processa cada linha para aplicar formatação em negrito
                      const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                      return (
                        <React.Fragment key={index}>
                          <span dangerouslySetInnerHTML={{ __html: formattedLine }} />
                          {index < msg.content.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      );
                    })}
                  </div>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>
      {/* Input fixado + quick replies */}

      <div className="max-w-4xl mx-auto w-full px-4 py-4 pt-0">
        {/* Carrossel de respostas rápidas */}
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {quickReplies.map((text, i) => (
            <button
              key={i}
              onClick={() => sendMessage(text)}
              className="flex-shrink-0 bg-transparent border border-blue-400 text-blue-400 text-sm px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition whitespace-nowrap"
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
            className="flex gap-2 mt-2 w-full"
          >
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 min-w-0 bg-[#0F1A34] border border-gray-600 rounded-md px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition flex-shrink-0"
            >
              Enviar
            </button>
          </form>
      </div>
    </div>
  );
};

export default AthenaChatPage;
