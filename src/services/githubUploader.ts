interface GitHubConfig {
  owner: string;
  repo: string;
  token: string;
}

interface UploadProgress {
  current: number;
  total: number;
  currentFile: string;
  status: 'uploading' | 'success' | 'error';
  message: string;
}

interface GitHubRepoResponse {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
}

interface GitHubErrorResponse {
  message?: string;
}

export class GitHubUploader {
  private config: GitHubConfig;
  private baseUrl = 'https://api.github.com';
  private onProgress?: (progress: UploadProgress) => void;

  constructor(config: GitHubConfig, onProgress?: (progress: UploadProgress) => void) {
    this.config = config;
    this.onProgress = onProgress;
  }

  private async makeRequest(endpoint: string, method: string = 'GET', body?: Record<string, unknown>) {
    const headers: HeadersInit = {
      'Authorization': `token ${this.config.token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
      const error = await response.json() as GitHubErrorResponse;
      throw new Error(error.message || `GitHub API error: ${response.status}`);
    }

    return response.json();
  }

  async checkRepoExists(): Promise<boolean> {
    try {
      await this.makeRequest(`/repos/${this.config.owner}/${this.config.repo}`);
      return true;
    } catch {
      return false;
    }
  }

  async createRepo(description: string = 'FluxAnimate - GIF & Image Processing Platform'): Promise<GitHubRepoResponse> {
    const body = {
      name: this.config.repo,
      description,
      private: false,
      auto_init: false
    };

    return this.makeRequest('/user/repos', 'POST', body) as Promise<GitHubRepoResponse>;
  }

  private encodeBase64(content: string): string {
    return btoa(unescape(encodeURIComponent(content)));
  }

  async uploadFile(path: string, content: string, message: string = 'Add file'): Promise<void> {
    const encodedContent = this.encodeBase64(content);
    
    const body = {
      message,
      content: encodedContent
    };

    await this.makeRequest(
      `/repos/${this.config.owner}/${this.config.repo}/contents/${path}`,
      'PUT',
      body
    );
  }

  async uploadProject(files: { path: string; content: string }[]): Promise<void> {
    const total = files.length;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (this.onProgress) {
        this.onProgress({
          current: i + 1,
          total,
          currentFile: file.path,
          status: 'uploading',
          message: `Subiendo ${file.path} (${i + 1}/${total})...`
        });
      }

      try {
        await this.uploadFile(file.path, file.content, `Add ${file.path}`);
        
        // Rate limiting: esperar 1 segundo entre archivos para evitar límites de GitHub API
        if (i < files.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        if (this.onProgress) {
          this.onProgress({
            current: i + 1,
            total,
            currentFile: file.path,
            status: 'error',
            message: `Error subiendo ${file.path}: ${error}`
          });
        }
        throw error;
      }
    }

    if (this.onProgress) {
      this.onProgress({
        current: total,
        total,
        currentFile: '',
        status: 'success',
        message: `¡Proyecto subido exitosamente! ${total} archivos subidos.`
      });
    }
  }

  static saveToken(token: string): void {
    localStorage.setItem('githubToken', token);
  }

  static getToken(): string | null {
    return localStorage.getItem('githubToken');
  }

  static clearToken(): void {
    localStorage.removeItem('githubToken');
  }

  getRepoUrl(): string {
    return `https://github.com/${this.config.owner}/${this.config.repo}`;
  }
}

/**
 * Esta función debe ser llamada desde el componente GithubUploader
 * para obtener todos los archivos del proyecto usando la API de MGX
 */
export async function getAllProjectFiles(): Promise<{ path: string; content: string }[]> {
  // IMPORTANTE: Esta función ahora retorna un array vacío
  // El componente GithubUploader debe usar el Editor de MGX para leer los archivos
  console.warn('getAllProjectFiles debe ser implementado usando el Editor de MGX');
  return [];
}