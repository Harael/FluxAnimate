export interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'create' | 'convert' | 'edit' | 'ai';
  icon: string;
  color: string;
}

export const tools: Tool[] = [
  // CREATE
  {
    id: 'gif-maker',
    name: 'GIF Maker',
    description: 'Crea GIFs desde imágenes o videos',
    category: 'create',
    icon: '🎬',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'video-to-gif',
    name: 'Video to GIF',
    description: 'Convierte videos a GIF animados',
    category: 'create',
    icon: '🎥',
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'animated-text',
    name: 'Texto Animado',
    description: 'Genera textos animados personalizados',
    category: 'create',
    icon: '✨',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'spritesheet-gen',
    name: 'Spritesheet Generator',
    description: 'Genera spritesheets desde frames',
    category: 'create',
    icon: '🎮',
    color: 'from-indigo-500 to-purple-500'
  },

  // CONVERT
  {
    id: 'gif-to-webp',
    name: 'GIF to WebP',
    description: 'Convierte GIF a formato WebP',
    category: 'convert',
    icon: '🔄',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'gif-to-apng',
    name: 'GIF to APNG',
    description: 'Convierte GIF a APNG',
    category: 'convert',
    icon: '🔁',
    color: 'from-teal-500 to-cyan-500'
  },
  {
    id: 'gif-to-mp4',
    name: 'GIF to MP4',
    description: 'Convierte GIF a video MP4',
    category: 'convert',
    icon: '📹',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'webp-to-gif',
    name: 'WebP to GIF',
    description: 'Convierte WebP a GIF',
    category: 'convert',
    icon: '🔃',
    color: 'from-emerald-500 to-green-500'
  },
  {
    id: 'avif-converter',
    name: 'AVIF Converter',
    description: 'Convierte entre AVIF y otros formatos',
    category: 'convert',
    icon: '🖼️',
    color: 'from-violet-500 to-purple-500'
  },

  // EDIT
  {
    id: 'resize',
    name: 'Resize',
    description: 'Cambia el tamaño de GIFs',
    category: 'edit',
    icon: '📐',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'crop',
    name: 'Crop',
    description: 'Recorta GIFs al tamaño deseado',
    category: 'edit',
    icon: '✂️',
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 'optimize',
    name: 'Optimize',
    description: 'Optimiza GIFs para reducir tamaño',
    category: 'edit',
    icon: '⚡',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'reverse',
    name: 'Reverse',
    description: 'Invierte la animación del GIF',
    category: 'edit',
    icon: '⏪',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'speed',
    name: 'Speed Changer',
    description: 'Ajusta la velocidad de animación',
    category: 'edit',
    icon: '⏩',
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'effects',
    name: 'Effects',
    description: 'Aplica efectos especiales (glitch, VHS, neón)',
    category: 'edit',
    icon: '🎨',
    color: 'from-fuchsia-500 to-pink-500'
  },
  {
    id: 'frame-editor',
    name: 'Frame Editor',
    description: 'Edita frames individuales',
    category: 'edit',
    icon: '🖌️',
    color: 'from-rose-500 to-red-500'
  },

  // AI
  {
    id: 'ai-upscale',
    name: 'AI Upscaling',
    description: 'Aumenta resolución con IA (x2, x4)',
    category: 'ai',
    icon: '🚀',
    color: 'from-purple-600 to-indigo-600'
  },
  {
    id: 'bg-removal',
    name: 'Background Removal',
    description: 'Elimina fondos con IA',
    category: 'ai',
    icon: '🎯',
    color: 'from-indigo-600 to-blue-600'
  },
  {
    id: 'frame-interpolation',
    name: 'Frame Interpolation',
    description: 'Suaviza animaciones con IA',
    category: 'ai',
    icon: '🎬',
    color: 'from-blue-600 to-cyan-600'
  },
  {
    id: 'color-restoration',
    name: 'Color Restoration',
    description: 'Restaura colores con IA',
    category: 'ai',
    icon: '🌈',
    color: 'from-cyan-600 to-teal-600'
  },
  {
    id: 'dequantization',
    name: 'Neural Dequantization',
    description: 'Reduce posterización con IA',
    category: 'ai',
    icon: '✨',
    color: 'from-violet-600 to-purple-600'
  },
  {
    id: 'smart-optimize',
    name: 'Smart Optimize',
    description: 'Optimización inteligente automática',
    category: 'ai',
    icon: '🧠',
    color: 'from-purple-600 to-fuchsia-600'
  }
];

export const getCategoryTools = (category: Tool['category']) => {
  return tools.filter(tool => tool.category === category);
};

export const getToolById = (id: string) => {
  return tools.find(tool => tool.id === id);
};

export const categories = [
  { id: 'create', name: 'Crear', icon: '🎬', color: 'text-purple-500' },
  { id: 'convert', name: 'Convertir', icon: '🔄', color: 'text-green-500' },
  { id: 'edit', name: 'Editar', icon: '✂️', color: 'text-orange-500' },
  { id: 'ai', name: 'IA', icon: '🚀', color: 'text-indigo-500' }
] as const;