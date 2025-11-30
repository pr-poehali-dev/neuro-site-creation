import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { 
      type: "ai", 
      text: "Привет! Я Жирная мать Павлова — твой личный разработчик. Опиши идею сайта, и я создам его прямо здесь. Что будем строить?",
      time: "10:23"
    }
  ]);
  const [activeTab, setActiveTab] = useState("chat");
  const [isTyping, setIsTyping] = useState(false);

  const projects = [
    { id: 1, name: "Лендинг для кафе", status: "В работе", lastEdit: "5 мин назад", preview: "🍕" },
    { id: 2, name: "Портфолио дизайнера", status: "Завершён", lastEdit: "2 часа назад", preview: "🎨" },
    { id: 3, name: "Интернет-магазин", status: "В работе", lastEdit: "Вчера", preview: "🛒" },
  ];

  const tools = [
    { icon: "FileCode2", name: "Редактор кода", desc: "React, TypeScript, Tailwind" },
    { icon: "Database", name: "База данных", desc: "PostgreSQL с миграциями" },
    { icon: "Cloud", name: "Бэкенд функции", desc: "Python/TypeScript в облаке" },
    { icon: "Palette", name: "UI компоненты", desc: "shadcn/ui библиотека" },
    { icon: "Image", name: "Генерация изображений", desc: "FLUX AI модель" },
    { icon: "Globe", name: "Публикация", desc: "Мгновенный деплой в сеть" },
  ];

  const capabilities = [
    "Создание React компонентов",
    "Настройка базы данных",
    "Backend API функции",
    "Адаптивный дизайн",
    "Генерация изображений AI",
    "Интеграция с внешними API",
    "SEO оптимизация",
    "Публикация в интернет"
  ];

  const codeExample = `import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="py-20">
      <h1 className="text-5xl font-bold">
        Привет, мир!
      </h1>
      <Button>Начать</Button>
    </section>
  );
};`;

  const handlePublish = () => {
    const siteUrl = window.location.origin;
    
    toast({
      title: "Публикация началась",
      description: "Ваш проект будет доступен через несколько секунд...",
    });
    
    setTimeout(() => {
      toast({
        title: "✅ Проект опубликован!",
        description: (
          <div className="flex flex-col gap-2">
            <span>Ваш сайт уже доступен по адресу:</span>
            <a 
              href={siteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              {siteUrl}
            </a>
          </div>
        ),
      });
    }, 2000);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const userMsg = { type: "user", text: message, time: "10:24" };
    setChatHistory([...chatHistory, userMsg]);
    setMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        type: "ai",
        text: "Отлично! Начинаю создавать проект. Сейчас настрою структуру, добавлю компоненты и стили. Это займёт несколько секунд...",
        time: "10:24",
        tools: ["FileCode2", "Palette", "Layout"]
      };
      setChatHistory(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-white/10 glass sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Icon name="Sparkles" size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold">ИИ Разработчик</h1>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-1 border-green-500/50 text-green-400">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Онлайн
            </Badge>
            <Button variant="outline" size="sm" className="border-white/20">
              <Icon name="Github" size={16} className="mr-2" />
              GitHub
            </Button>
            <Button size="sm" className="gradient-bg text-white" onClick={handlePublish}>
              <Icon name="Rocket" size={16} className="mr-2" />
              Опубликовать
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 grid lg:grid-cols-[350px_1fr_350px] gap-0">
        <aside className="border-r border-white/10 bg-card/30 hidden lg:block">
          <div className="p-4 border-b border-white/10">
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <Icon name="FolderOpen" size={18} />
              Мои проекты
            </h2>
            <Button size="sm" className="w-full gradient-bg text-white">
              <Icon name="Plus" size={16} className="mr-2" />
              Новый проект
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-180px)]">
            <div className="p-4 space-y-3">
              {projects.map((project) => (
                <Card 
                  key={project.id} 
                  className="p-3 glass border-white/10 hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{project.preview}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate mb-1">{project.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-foreground/60">
                        <Badge variant="secondary" className="text-xs px-1.5 py-0">
                          {project.status}
                        </Badge>
                        <span>{project.lastEdit}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </aside>

        <main className="flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="border-b border-white/10 px-4">
              <TabsList className="bg-transparent">
                <TabsTrigger value="chat" className="gap-2">
                  <Icon name="MessageSquare" size={16} />
                  Чат с ИИ
                </TabsTrigger>
                <TabsTrigger value="code" className="gap-2">
                  <Icon name="Code2" size={16} />
                  Код
                </TabsTrigger>
                <TabsTrigger value="preview" className="gap-2">
                  <Icon name="Eye" size={16} />
                  Превью
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="chat" className="flex-1 flex flex-col m-0">
              <ScrollArea className="flex-1 p-4">
                <div className="max-w-3xl mx-auto space-y-4">
                  {chatHistory.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] ${msg.type === "user" ? "" : "flex gap-3"}`}>
                        {msg.type === "ai" && (
                          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                            <Icon name="Bot" size={16} className="text-white" />
                          </div>
                        )}
                        <div>
                          <div className={`p-4 rounded-2xl ${
                            msg.type === "user" 
                              ? "gradient-bg text-white ml-auto" 
                              : "glass border border-white/10"
                          }`}>
                            <p className="text-sm leading-relaxed">{msg.text}</p>
                            {msg.tools && (
                              <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
                                {msg.tools.map((tool, i) => (
                                  <div key={i} className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
                                    <Icon name={tool} size={14} />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-foreground/40 mt-1 px-1">
                            {msg.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                        <Icon name="Bot" size={16} className="text-white" />
                      </div>
                      <div className="glass border border-white/10 p-4 rounded-2xl">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce" style={{animationDelay: "0s"}} />
                          <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce" style={{animationDelay: "0.2s"}} />
                          <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce" style={{animationDelay: "0.4s"}} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="border-t border-white/10 p-4 glass">
                <div className="max-w-3xl mx-auto flex gap-2">
                  <Textarea
                    placeholder="Опишите что нужно сделать... (например: 'добавь секцию с отзывами' или 'измени цвет кнопок на синий')"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="glass border-white/10 resize-none min-h-[60px]"
                    rows={2}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    className="gradient-bg text-white px-6"
                    disabled={!message.trim()}
                  >
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="code" className="flex-1 m-0 p-4">
              <div className="max-w-4xl mx-auto">
                <Card className="glass border-white/10 overflow-hidden">
                  <div className="bg-muted/30 px-4 py-2 border-b border-white/10 flex items-center justify-between">
                    <span className="text-sm font-mono text-foreground/60">src/components/Hero.tsx</span>
                    <Button size="sm" variant="ghost">
                      <Icon name="Copy" size={14} className="mr-2" />
                      Копировать
                    </Button>
                  </div>
                  <ScrollArea className="h-[600px]">
                    <pre className="p-4 text-sm font-mono">
                      <code className="text-foreground/80">{codeExample}</code>
                    </pre>
                  </ScrollArea>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="flex-1 m-0 bg-white">
              <div className="h-full flex items-center justify-center text-gray-600">
                <div className="text-center">
                  <Icon name="Eye" size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Здесь будет предпросмотр вашего сайта</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>

        <aside className="border-l border-white/10 bg-card/30 hidden lg:block">
          <div className="p-4 border-b border-white/10">
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <Icon name="Wrench" size={18} />
              Инструменты ИИ
            </h2>
          </div>
          <ScrollArea className="h-[calc(100vh-180px)]">
            <div className="p-4 space-y-3">
              {tools.map((tool, idx) => (
                <Card 
                  key={idx} 
                  className="p-3 glass border-white/10 hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon name={tool.icon} size={16} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm mb-1">{tool.name}</h3>
                      <p className="text-xs text-foreground/60">{tool.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}

              <div className="pt-4 mt-4 border-t border-white/10">
                <h3 className="text-xs font-semibold text-foreground/60 mb-3 uppercase">Возможности</h3>
                <div className="flex flex-wrap gap-2">
                  {capabilities.map((cap, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {cap}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </aside>
      </div>
    </div>
  );
};

export default Index;