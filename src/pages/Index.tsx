import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Zap, Github, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import GithubUploader from '@/components/GithubUploader';

export default function Index() {
  const navigate = useNavigate();
  const [showGithubUploader, setShowGithubUploader] = useState(false);

  const features = [
    {
      icon: '🎬',
      title: 'Creación Avanzada',
      description: 'Crea GIFs desde videos, imágenes o genera textos animados personalizados',
      image: '/assets/feature-gif-tools.png'
    },
    {
      icon: '🔄',
      title: 'Conversión Universal',
      description: 'Convierte entre GIF, WebP, APNG, AVIF, MP4 y más formatos',
      image: '/assets/feature-gif-tools_variant_1.png'
    },
    {
      icon: '🚀',
      title: 'IA Integrada',
      description: 'Upscaling, eliminación de fondo, interpolación de frames y más con IA',
      image: '/assets/feature-ai-upscaling.png'
    },
    {
      icon: '⚡',
      title: 'Edición Profesional',
      description: 'Resize, crop, optimize, efectos especiales y editor frame por frame',
      image: '/assets/feature-gif-tools_variant_2.png'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
              F
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              FluxAnimate
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowGithubUploader(true)}
              className="gap-2"
            >
              <Github className="h-4 w-4" />
              Subir a GitHub
            </Button>
            <Button onClick={() => navigate('/tools')} className="gap-2">
              Comenzar
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Potenciado por Inteligencia Artificial
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
            Crea, Edita y Optimiza GIFs
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            La plataforma más completa para procesamiento de GIFs e imágenes animadas con herramientas avanzadas de IA
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/tools')} className="gap-2 text-lg px-8">
              <Zap className="h-5 w-5" />
              Explorar Herramientas
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/editor')} className="text-lg px-8">
              Ir al Editor
            </Button>
          </div>

          {/* Hero Image */}
          <div className="mt-12 rounded-2xl overflow-hidden shadow-2xl border">
            <img
              src="/assets/hero-banner-animated-waves.jpg"
              alt="FluxAnimate Platform"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Herramientas Profesionales</h2>
          <p className="text-xl text-muted-foreground">
            Todo lo que necesitas para trabajar con GIFs e imágenes animadas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-purple-500 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-3xl mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* GitHub Export Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="border-2 border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30">
          <CardHeader className="text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-4">
              <Github className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl">Exportación a GitHub</CardTitle>
            <CardDescription className="text-lg">
              Sube todo el código del proyecto directamente a tu repositorio de GitHub con un solo clic
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <img
              src="/assets/feature-github-export.png"
              alt="GitHub Export"
              className="w-full max-w-md mx-auto mb-6 rounded-lg"
            />
            <Button
              size="lg"
              onClick={() => setShowGithubUploader(true)}
              className="gap-2"
            >
              <Github className="h-5 w-5" />
              Configurar GitHub Export
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-bold">¿Listo para comenzar?</h2>
          <p className="text-xl text-muted-foreground">
            Accede a todas las herramientas de forma gratuita y comienza a crear contenido increíble
          </p>
          <Button size="lg" onClick={() => navigate('/tools')} className="gap-2 text-lg px-8">
            <Sparkles className="h-5 w-5" />
            Comenzar Ahora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2024 FluxAnimate. Creado con ❤️ usando React + shadcn-ui</p>
        </div>
      </footer>

      <GithubUploader open={showGithubUploader} onOpenChange={setShowGithubUploader} />
    </div>
  );
}