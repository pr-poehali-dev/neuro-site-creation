import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Index = () => {
  const [aiMessage, setAiMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { type: "ai", text: "Привет! Я ИИ-помощник. Расскажу как создать сайт вашей мечты. Какой проект хотите создать?" }
  ]);

  const templates = [
    { id: 1, name: "Лендинг для стартапа", category: "Бизнес", color: "from-purple-500 to-pink-500" },
    { id: 2, name: "Интернет-магазин", category: "E-commerce", color: "from-blue-500 to-cyan-500" },
    { id: 3, name: "Портфолио дизайнера", category: "Креатив", color: "from-orange-500 to-red-500" },
    { id: 4, name: "Корпоративный сайт", category: "Бизнес", color: "from-green-500 to-teal-500" },
    { id: 5, name: "Блог о путешествиях", category: "Контент", color: "from-yellow-500 to-orange-500" },
    { id: 6, name: "SaaS платформа", category: "Технологии", color: "from-indigo-500 to-purple-500" },
  ];

  const examples = [
    { name: "TechFlow", desc: "Лендинг для IT-стартапа", image: "🚀" },
    { name: "FashionHub", desc: "Интернет-магазин одежды", image: "👗" },
    { name: "FoodieSpot", desc: "Сайт ресторана", image: "🍕" },
    { name: "FitLife", desc: "Фитнес-приложение", image: "💪" },
  ];

  const features = [
    { icon: "Sparkles", title: "ИИ-генерация", desc: "Создавайте сайты из текстового описания" },
    { icon: "Layers", title: "Готовые шаблоны", desc: "100+ профессиональных дизайнов" },
    { icon: "Palette", title: "Умный редактор", desc: "Интуитивная настройка всех элементов" },
    { icon: "Zap", title: "Мгновенная публикация", desc: "От идеи до сайта за 5 минут" },
  ];

  const handleSendMessage = () => {
    if (!aiMessage.trim()) return;
    
    setChatHistory([...chatHistory, 
      { type: "user", text: aiMessage },
      { type: "ai", text: "Отличная идея! Предлагаю начать с современного лендинга. Добавьте яркий заголовок, секцию о преимуществах и форму контактов. Какой стиль дизайна вам нравится?" }
    ]);
    setAiMessage("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold gradient-text">SiteAI</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
              Шаблоны
            </Button>
            <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
              Примеры
            </Button>
            <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
              Контакты
            </Button>
            <Button className="gradient-bg text-white font-semibold">
              Начать создавать
            </Button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-5xl">
          <div className="animate-fade-in">
            <h2 className="text-6xl md:text-7xl font-bold gradient-text mb-6 leading-tight">
              Создавайте сайты<br />силой мысли
            </h2>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Просто опишите свою идею — нейросеть создаст профессиональный сайт за минуты. 
              Без кода, без дизайнеров, без проблем.
            </p>
            <div className="flex gap-4 justify-center items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="lg" className="gradient-bg text-white font-semibold text-lg px-8 py-6 hover:scale-105 transition-transform">
                    <Icon name="Sparkles" className="mr-2" size={20} />
                    Создать с ИИ
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[400px] glass border-l border-white/10">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2 text-xl">
                      <Icon name="Bot" size={24} className="text-primary" />
                      ИИ-Ассистент
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col h-[calc(100vh-120px)]">
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                      {chatHistory.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[80%] p-3 rounded-2xl ${
                            msg.type === "user" 
                              ? "bg-primary text-white" 
                              : "glass border border-white/10"
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Опишите ваш сайт..."
                        value={aiMessage}
                        onChange={(e) => setAiMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="glass border-white/10"
                      />
                      <Button onClick={handleSendMessage} className="gradient-bg">
                        <Icon name="Send" size={20} />
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white/20 hover:bg-white/5">
                Смотреть примеры
              </Button>
            </div>
          </div>
          
          <div className="mt-16 grid md:grid-cols-4 gap-6 animate-slide-up">
            {features.map((feature, idx) => (
              <Card key={idx} className="glass border-white/10 p-6 hover:scale-105 transition-transform cursor-pointer">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 mx-auto">
                  <Icon name={feature.icon} size={24} className="text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-foreground/60">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white/5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold gradient-text mb-4">Шаблоны на любой вкус</h2>
            <p className="text-foreground/70 text-lg">Выберите готовый дизайн и настройте под себя</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="glass border-white/10 overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
                <div className={`h-48 bg-gradient-to-br ${template.color} flex items-center justify-center text-white text-4xl font-bold`}>
                  {template.name.charAt(0)}
                </div>
                <div className="p-6">
                  <div className="text-xs text-foreground/50 mb-2">{template.category}</div>
                  <h3 className="font-semibold text-lg mb-3">{template.name}</h3>
                  <Button className="w-full gradient-bg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    Использовать
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold gradient-text mb-4">Галерея примеров</h2>
            <p className="text-foreground/70 text-lg">Сайты, созданные нашими пользователями</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {examples.map((example, idx) => (
              <Card key={idx} className="glass border-white/10 overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-6xl">
                  {example.image}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{example.name}</h3>
                  <p className="text-sm text-foreground/60">{example.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white/5">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold gradient-text mb-4">Остались вопросы?</h2>
            <p className="text-foreground/70 text-lg">Свяжитесь с нами — мы поможем!</p>
          </div>
          <Card className="glass border-white/10 p-8">
            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                <Input placeholder="Иван Иванов" className="glass border-white/10" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input type="email" placeholder="ivan@example.com" className="glass border-white/10" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Сообщение</label>
                <Textarea placeholder="Расскажите о вашей идее..." rows={5} className="glass border-white/10" />
              </div>
              <Button className="w-full gradient-bg text-white font-semibold py-6 text-lg">
                Отправить сообщение
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-white/10">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold gradient-text mb-4">SiteAI</h2>
          <p className="text-foreground/60 mb-6">Создавайте сайты с помощью нейросети</p>
          <div className="flex gap-6 justify-center text-foreground/60">
            <a href="#" className="hover:text-foreground transition-colors">Шаблоны</a>
            <a href="#" className="hover:text-foreground transition-colors">Примеры</a>
            <a href="#" className="hover:text-foreground transition-colors">Контакты</a>
            <a href="#" className="hover:text-foreground transition-colors">Поддержка</a>
          </div>
          <div className="mt-6 text-sm text-foreground/40">
            © 2024 SiteAI. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
