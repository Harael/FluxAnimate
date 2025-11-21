import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { tools, categories } from '@/lib/tools';
import { ArrowLeft, Github } from 'lucide-react';
import { useState } from 'react';
import GithubUploader from '@/components/GithubUploader';

export default function Tools() {
  const navigate = useNavigate();
  const [showGithubUploader, setShowGithubUploader] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Inicio
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold">
                F
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                FluxAnimate
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowGithubUploader(true)}
            className="gap-2"
          >
            <Github className="h-4 w-4" />
            Subir a GitHub
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Herramientas
          </h1>
          <p className="text-xl text-muted-foreground">
            Selecciona una herramienta para comenzar a procesar tus archivos
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 mb-8">
            <TabsTrigger value="all">Todas</TabsTrigger>
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>
                <span className="mr-1">{cat.icon}</span>
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            {categories.map((category) => (
              <div key={category.id}>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className={category.color}>{category.icon}</span>
                  {category.name}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {tools
                    .filter((tool) => tool.category === category.id)
                    .map((tool) => (
                      <Card
                        key={tool.id}
                        className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-purple-500"
                        onClick={() => navigate(`/editor?tool=${tool.id}`)}
                      >
                        <CardHeader>
                          <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl mb-2`}>
                            {tool.icon}
                          </div>
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                          <CardDescription>{tool.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full" variant="secondary">
                            Usar Herramienta
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tools
                  .filter((tool) => tool.category === category.id)
                  .map((tool) => (
                    <Card
                      key={tool.id}
                      className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-purple-500"
                      onClick={() => navigate(`/editor?tool=${tool.id}`)}
                    >
                      <CardHeader>
                        <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl mb-2`}>
                          {tool.icon}
                        </div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full" variant="secondary">
                          Usar Herramienta
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <GithubUploader open={showGithubUploader} onOpenChange={setShowGithubUploader} />
    </div>
  );
}