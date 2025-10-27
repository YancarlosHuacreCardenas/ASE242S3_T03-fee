import { RenderMode, ServerRoute } from '@angular/ssr';

// 1. **Define a function to fetch the IDs for 'cliente'**
//    You need to replace the placeholder array with actual logic 
//    to fetch the IDs from your database or API at build time.
const getClientePrerenderParams = async () => {
  // 🚨 IMPORTANT: Replace this placeholder with real logic
  // to fetch all customer IDs that should be prerendered.
  const clienteIds = ['1', '2', '3']; // Example IDs
  
  return clienteIds.map(id => ({ id }));
};

// 2. **Define a function to fetch the IDs for 'producto'**
//    You need to replace the placeholder array with actual logic 
//    to fetch the IDs from your database or API at build time.
const getProductoPrerenderParams = async () => {
  // 🚨 IMPORTANT: Replace this placeholder with real logic
  // to fetch all product IDs that should be prerendered.
  const productoIds = ['a1', 'b2', 'c3']; // Example IDs
  
  return productoIds.map(id => ({ id }));
};

export const serverRoutes: ServerRoute[] = [
  {
    path: 'admin/cliente-form/:id', // Specific parametrized route
    renderMode: RenderMode.Prerender,
    getPrerenderParams: getClientePrerenderParams, // Add the function here
  },
  {
    path: 'admin/producto-form/:id', // Specific parametrized route
    renderMode: RenderMode.Prerender,
    getPrerenderParams: getProductoPrerenderParams, // Add the function here
  },
  {
    path: '**', // Keep the catch-all for all other non-parametrized routes
    renderMode: RenderMode.Prerender
  }
];
