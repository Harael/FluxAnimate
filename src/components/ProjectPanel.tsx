import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Download, Clock } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  type: string;
  timestamp: number;
  size: string;
}

export default function ProjectPanel() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const saved = localStorage.getItem('fluxanimate_projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    }
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem('fluxanimate_projects', JSON.stringify(updated));
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Hace menos de 1 hora';
    if (hours < 24) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
    return date.toLocaleDateString();
  };

  if (projects.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Proyectos Recientes</CardTitle>
          <CardDescription>Tus archivos procesados aparecerán aquí</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No hay proyectos guardados</p>
            <p className="text-sm mt-2">Los archivos se guardan automáticamente por 24 horas</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Proyectos Recientes</CardTitle>
        <CardDescription>Archivos procesados en las últimas 24 horas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium">{project.name}</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                  <span>{project.type}</span>
                  <span>•</span>
                  <span>{project.size}</span>
                  <span>•</span>
                  <span>{formatDate(project.timestamp)}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteProject(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}