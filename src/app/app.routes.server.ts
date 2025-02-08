import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'user/:id',
    renderMode: RenderMode.Server // Imposta un renderMode diverso per non usare il prerendering
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];