import { useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Upload, Download, Github, Sparkles, Zap } from 'lucide-react';
import { getToolById } from '@/lib/tools';
import ProjectPanel from '@/components/ProjectPanel';
import GithubUploader from '@/components/GithubUploader';

export default function Editor() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toolId = searchParams.get('tool');
  const tool = toolId ? getToolById(toolId) : null;

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showGithubUploader, setShowGithubUploader] = useState(false);

  // Configuraciones de herramientas
  const [quality, setQuality] = useState([80]);
  const [scale, setScale] = useState([100]);
  const [speed, setSpeed] = useState([100]);
  const [format, setFormat] = useState('gif');

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      const url = URL.createObjectURL(droppedFile);
      setPreview(url);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreview(url);
    }
  };

  const simulateProcessing = async () => {
    setProcessing(true);
    setProgress(0);

    // Simular procesamiento con progreso
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setProgress(i);
    }

    // Guardar en proyectos
    const project = {
      id: Date.now().toString(),
      name: file?.name || 'Archivo procesado',
      type: tool?.name || 'Procesado',
      timestamp: Date.now(),
      size: file ? `${(file.size / 1024).toFixed(1)} KB` : 'N/A'
    };

    const saved = localStorage.getItem('fluxanimate_projects');
    const projects = saved ? JSON.parse(saved) : [];
    projects.unshift(project);
    localStorage.setItem('fluxanimate_projects', JSON.stringify(projects.slice(0, 10)));

    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/tools')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Herramientas
            </Button>
            {tool && (
              <div className="flex items-center gap-2">
                <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center text-lg`}>
                  {tool.icon}
                </div>
                <span className="font-semibold">{tool.name}</span>
              </div>
            )}
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

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Editor Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Area */}
            <Card>
              <CardHeader>
                <CardTitle>Subir Archivo</CardTitle>
                <CardDescription>
                  Arrastra y suelta tu archivo o haz clic para seleccionar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed rounded-lg p-12 text-center hover:border-purple-500 transition-colors cursor-pointer"
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  {preview ? (
                    <div className="space-y-4">
                      <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                      <p className="text-sm text-muted-foreground">{file?.name}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                      <div>
                        <p className="font-medium">Arrastra tu archivo aquí</p>
                        <p className="text-sm text-muted-foreground">o haz clic para seleccionar</p>
                      </div>
                    </div>
                  )}
                  <input
                    id="file-input"
                    type="file"
                    className="hidden"
                    onChange={handleFileInput}
                    accept="image/*,video/*,.gif"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Processing Controls */}
            {file && (
              <Card>
                <CardHeader>
                  <CardTitle>Configuración</CardTitle>
                  <CardDescription>Ajusta los parámetros de procesamiento</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="basic">Básico</TabsTrigger>
                      <TabsTrigger value="advanced">Avanzado</TabsTrigger>
                      <TabsTrigger value="ai">IA</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic" className="space-y-6 mt-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Formato de Salida</label>
                        <Select value={format} onValueChange={setFormat}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gif">GIF</SelectItem>
                            <SelectItem value="webp">WebP</SelectItem>
                            <SelectItem value="apng">APNG</SelectItem>
                            <SelectItem value="mp4">MP4</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Calidad: {quality}%</label>
                        <Slider value={quality} onValueChange={setQuality} max={100} step={1} />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Escala: {scale}%</label>
                        <Slider value={scale} onValueChange={setScale} max={200} step={5} />
                      </div>
                    </TabsContent>

                    <TabsContent value="advanced" className="space-y-6 mt-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Velocidad: {speed}%</label>
                        <Slider value={speed} onValueChange={setSpeed} min={25} max={400} step={25} />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Optimización</label>
                        <Select defaultValue="balanced">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="quality">Máxima Calidad</SelectItem>
                            <SelectItem value="balanced">Balanceado</SelectItem>
                            <SelectItem value="size">Mínimo Tamaño</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TabsContent>

                    <TabsContent value="ai" className="space-y-6 mt-6">
                      <div className="space-y-4">
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <Sparkles className="h-4 w-4" />
                          AI Upscaling (x2)
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <Zap className="h-4 w-4" />
                          Eliminar Fondo
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <Sparkles className="h-4 w-4" />
                          Interpolación de Frames
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <Zap className="h-4 w-4" />
                          Restauración de Color
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {processing && (
                    <div className="mt-6 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Procesando...</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} />
                    </div>
                  )}

                  <div className="flex gap-2 mt-6">
                    <Button
                      className="flex-1"
                      onClick={simulateProcessing}
                      disabled={processing}
                    >
                      {processing ? 'Procesando...' : 'Procesar'}
                    </Button>
                    <Button variant="outline" disabled={!processing && progress < 100}>
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ProjectPanel />

            {tool && (
              <Card>
                <CardHeader>
                  <CardTitle>Acerca de esta herramienta</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`h-16 w-16 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center text-3xl mb-4`}>
                    {tool.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <GithubUploader open={showGithubUploader} onOpenChange={setShowGithubUploader} />
    </div>
  );
}