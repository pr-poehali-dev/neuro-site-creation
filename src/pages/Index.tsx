import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

interface Message {
  type: "user" | "ai";
  text: string;
  time: string;
  actions?: Array<{ icon: string; label: string }>;
}

const Index = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { 
      type: "ai", 
      text: "Привет! Я Жирная мать Павлова — твой личный разработчик. Опиши идею сайта, и я создам его прямо здесь. Что будем строить?",
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping]);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const userMsg: Message = { 
      type: "user", 
      text: message, 
      time: getCurrentTime() 
    };
    
    setChatHistory([...chatHistory, userMsg]);
    setMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        {
          text: "Отлично! Начинаю создавать проект. Сейчас настрою структуру, добавлю компоненты и стили. Это займёт несколько секунд...",
          actions: [
            { icon: "FileCode2", label: "Создаю компоненты" },
            { icon: "Palette", label: "Настраиваю стили" },
            { icon: "Layout", label: "Создаю структуру" }
          ]
        },
        {
          text: "Понял задачу! Создам для вас современный и функциональный сайт с учётом всех пожеланий.",
          actions: [
            { icon: "Code2", label: "Пишу код" },
            { icon: "Sparkles", label: "Оптимизирую" }
          ]
        },
        {
          text: "Интересная идея! Давайте реализуем это вместе. Начинаю работу над проектом...",
          actions: [
            { icon: "Rocket", label: "Запускаю" },
            { icon: "Settings", label: "Конфигурирую" }
          ]
        }
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiResponse: Message = {
        type: "ai",
        text: randomResponse.text,
        time: getCurrentTime(),
        actions: randomResponse.actions
      };
      
      setChatHistory(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-white/10 glass sticky top-0 z-50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-primary/20">
              <Icon name="Bot" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Жирная мать Павлова</h1>
              <p className="text-xs text-foreground/60">ИИ-разработчик</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-1.5 border-green-500/50 text-green-400 bg-green-500/10">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Онлайн
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-white/20 hover:bg-white/5 hidden sm:flex"
            >
              <Icon name="Github" size={16} className="mr-2" />
              GitHub
            </Button>
            <Button 
              size="sm" 
              className="gradient-bg text-white hover:opacity-90 transition-opacity"
              onClick={() => {
                toast({
                  title: "✅ Проект готов!",
                  description: "Ваш сайт уже работает и доступен онлайн",
                });
              }}
            >
              <Icon name="Rocket" size={16} className="mr-2" />
              <span className="hidden sm:inline">Опубликовать</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
            {chatHistory.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-3 animate-fade-in ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.type === "ai" && (
                  <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                    <Icon name="Bot" size={16} className="text-white" />
                  </div>
                )}
                
                <div className={`flex flex-col ${msg.type === "user" ? "items-end" : "items-start"} max-w-[85%] sm:max-w-[75%]`}>
                  <div 
                    className={`px-4 py-3 rounded-2xl ${
                      msg.type === "user" 
                        ? "gradient-bg text-white shadow-lg shadow-primary/20" 
                        : "glass border border-white/10"
                    }`}
                  >
                    <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/10">
                        {msg.actions.map((action, i) => (
                          <div 
                            key={i} 
                            className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 text-xs"
                          >
                            <Icon name={action.icon} size={12} className="text-primary" />
                            <span className="text-foreground/70">{action.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-foreground/40 mt-1.5 px-1">
                    {msg.time}
                  </div>
                </div>

                {msg.type === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Icon name="User" size={16} className="text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 animate-fade-in">
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-lg shadow-primary/20">
                  <Icon name="Bot" size={16} className="text-white" />
                </div>
                <div className="glass border border-white/10 px-4 py-3 rounded-2xl">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce" style={{animationDelay: "0s"}} />
                    <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce" style={{animationDelay: "0.15s"}} />
                    <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce" style={{animationDelay: "0.3s"}} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t border-white/10 glass backdrop-blur-xl">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex gap-3 items-end">
              <Textarea
                placeholder="Опишите что нужно сделать... (например: 'создай лендинг для кафе' или 'добавь форму обратной связи')"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="glass border-white/20 resize-none min-h-[56px] focus:border-primary/50 transition-colors"
                rows={1}
              />
              <Button 
                onClick={handleSendMessage} 
                className="gradient-bg text-white h-[56px] px-6 hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                disabled={!message.trim() || isTyping}
              >
                <Icon name="Send" size={20} />
              </Button>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-foreground/40">
              <Icon name="Sparkles" size={12} />
              <span>ИИ может делать ошибки. Проверяйте важную информацию.</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
