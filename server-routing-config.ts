export const routes = [
    {
      path: 'user/:id',
      renderMode: 'prerender',
      getPrerenderParams: () => {
        // Restituisci un array di parametri da prerenderizzare
        return [
          { id: '1' },
          { id: '2' },
          { id: '3' }
        ];
      }
    },
    {
      path: 'posts/:id/comments',
      renderMode: 'prerender',
      getPrerenderParams: () => {
        // Restituisci un array di parametri da prerenderizzare
        return [
          { id: '1' },
          { id: '2' },
          { id: '3' }
        ];
      }
    }
  ];