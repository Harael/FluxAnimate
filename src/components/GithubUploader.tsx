import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GitHubUploader } from '@/services/githubUploader';
import { Github, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface GithubUploaderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function GithubUploaderComponent({ open, onOpenChange }: GithubUploaderProps) {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('FluxAnimate');
  const [token, setToken] = useState(GitHubUploader.getToken() || '');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');

  const handleUpload = async () => {
    if (!owner || !repo || !token) {
      setError('Por favor completa todos los campos');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess(false);
    setProgress(0);

    try {
      // Guardar token
      GitHubUploader.saveToken(token);

      const uploader = new GitHubUploader(
        { owner, repo, token },
        (progressData) => {
          const percentage = (progressData.current / progressData.total) * 100;
          setProgress(percentage);
          setCurrentFile(progressData.currentFile);
          
          if (progressData.status === 'success') {
            setSuccess(true);
          } else if (progressData.status === 'error') {
            setError(progressData.message);
          }
        }
      );

      // Verificar si el repo existe
      const exists = await uploader.checkRepoExists();
      if (!exists) {
        await uploader.createRepo();
      }

      // Obtener todos los archivos del proyecto
      const files = await getProjectFilesFromWorkspace();
      
      if (files.length === 0) {
        throw new Error('No se encontraron archivos para subir');
      }

      // Subir archivos
      await uploader.uploadProject(files);
      
      setRepoUrl(uploader.getRepoUrl());
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setSuccess(false);
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    if (!uploading) {
      onOpenChange(false);
      setError('');
      setSuccess(false);
      setProgress(0);
      setCurrentFile('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            Subir Proyecto a GitHub
          </DialogTitle>
          <DialogDescription>
            Sube todo el código de FluxAnimate a tu repositorio de GitHub
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="owner">Usuario/Organización de GitHub</Label>
            <Input
              id="owner"
              placeholder="tu-usuario"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              disabled={uploading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="repo">Nombre del Repositorio</Label>
            <Input
              id="repo"
              placeholder="FluxAnimate"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              disabled={uploading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="token">Token Personal de GitHub</Label>
            <Input
              id="token"
              type="password"
              placeholder="ghp_xxxxxxxxxxxx"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              disabled={uploading}
            />
            <p className="text-xs text-muted-foreground">
              Crea un token con scope <code className="bg-muted px-1 py-0.5 rounded">repo</code> en{' '}
              <a
                href="https://github.com/settings/tokens/new"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub Settings
              </a>
            </p>
          </div>

          {uploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progreso</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              {currentFile && (
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  {currentFile}
                </p>
              )}
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                ¡Proyecto subido exitosamente!{' '}
                {repoUrl && (
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline"
                  >
                    Ver repositorio
                  </a>
                )}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={uploading}>
            {success ? 'Cerrar' : 'Cancelar'}
          </Button>
          {!success && (
            <Button onClick={handleUpload} disabled={uploading}>
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Subiendo...
                </>
              ) : (
                <>
                  <Github className="mr-2 h-4 w-4" />
                  Subir a GitHub
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Función que obtiene todos los archivos del proyecto desde el workspace
 * Esta es una implementación de ejemplo que debe ser adaptada según la API de MGX
 */
async function getProjectFilesFromWorkspace(): Promise<{ path: string; content: string }[]> {
  // NOTA: En MGX, esta función debería usar el Editor para leer archivos
  // Por ahora, retornamos los archivos principales del proyecto de forma estática
  
  const projectFiles = [
    // Archivos de configuración raíz
    { path: 'package.json', content: await fetchFileContent('package.json') },
    { path: 'tsconfig.json', content: await fetchFileContent('tsconfig.json') },
    { path: 'vite.config.ts', content: await fetchFileContent('vite.config.ts') },
    { path: 'tailwind.config.ts', content: await fetchFileContent('tailwind.config.ts') },
    { path: 'postcss.config.js', content: await fetchFileContent('postcss.config.js') },
    { path: 'components.json', content: await fetchFileContent('components.json') },
    { path: 'index.html', content: await fetchFileContent('index.html') },
    { path: 'README.md', content: await fetchFileContent('README.md') },
    { path: '.gitignore', content: await fetchFileContent('.gitignore') },
    
    // Archivos src
    { path: 'src/main.tsx', content: await fetchFileContent('src/main.tsx') },
    { path: 'src/App.tsx', content: await fetchFileContent('src/App.tsx') },
    { path: 'src/App.css', content: await fetchFileContent('src/App.css') },
    { path: 'src/index.css', content: await fetchFileContent('src/index.css') },
    { path: 'src/vite-env.d.ts', content: await fetchFileContent('src/vite-env.d.ts') },
    
    // Páginas
    { path: 'src/pages/Index.tsx', content: await fetchFileContent('src/pages/Index.tsx') },
    { path: 'src/pages/Tools.tsx', content: await fetchFileContent('src/pages/Tools.tsx') },
    { path: 'src/pages/Editor.tsx', content: await fetchFileContent('src/pages/Editor.tsx') },
    { path: 'src/pages/NotFound.tsx', content: await fetchFileContent('src/pages/NotFound.tsx') },
    
    // Componentes
    { path: 'src/components/GithubUploader.tsx', content: await fetchFileContent('src/components/GithubUploader.tsx') },
    { path: 'src/components/ProjectPanel.tsx', content: await fetchFileContent('src/components/ProjectPanel.tsx') },
    
    // Servicios y librerías
    { path: 'src/services/githubUploader.ts', content: await fetchFileContent('src/services/githubUploader.ts') },
    { path: 'src/lib/tools.ts', content: await fetchFileContent('src/lib/tools.ts') },
    { path: 'src/lib/utils.ts', content: await fetchFileContent('src/lib/utils.ts') },
    
    // Hooks
    { path: 'src/hooks/use-mobile.tsx', content: await fetchFileContent('src/hooks/use-mobile.tsx') },
    { path: 'src/hooks/use-toast.ts', content: await fetchFileContent('src/hooks/use-toast.ts') },
  ];

  // Filtrar archivos que no se pudieron leer
  return projectFiles.filter(f => f.content !== '');
}

/**
 * Función auxiliar para obtener el contenido de un archivo
 * En un entorno real, esto usaría fetch() o la API del sistema de archivos
 */
async function fetchFileContent(path: string): Promise<string> {
  try {
    const response = await fetch(`/${path}`);
    if (response.ok) {
      return await response.text();
    }
  } catch {
    // Ignorar errores de lectura
  }
  return '';
}