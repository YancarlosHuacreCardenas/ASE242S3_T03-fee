import express from 'express';
import { join } from 'path';

const app = express();

// Carpeta donde Angular genera los archivos de build
const distFolder = join(__dirname, 'dist');
const indexHtml = 'index.html';

// Servir archivos estáticos de Angular
app.use(express.static(distFolder));

// Redirigir todas las rutas al index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(join(distFolder, indexHtml));
});

// Puerto
const port = process.env['PORT'] || 4200;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
