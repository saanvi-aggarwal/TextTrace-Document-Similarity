import { createServer } from 'vite';

async function checkTransforms() {
  const server = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  const files = [
    '/src/main.jsx',
    '/src/App.jsx',
    '/src/ErrorBoundary.jsx',
    '/src/components/Navbar.jsx',
    '/src/components/SectionHome.jsx',
    '/src/components/SectionProblem.jsx',
    '/src/components/SectionAlgorithms.jsx',
    '/src/components/SectionDPConcept.jsx',
    '/src/components/SectionLab.jsx',
    '/src/components/SectionVisualizationStudio.jsx',
    '/src/components/SectionResults.jsx',
    '/src/components/SectionAbout.jsx',
    '/src/components/Footer.jsx',
    '/src/components/MinimalLCSVisualizer.jsx',
    '/src/components/MinimalEditVisualizer.jsx',
    '/src/components/MinimalDPMatrix.jsx',
  ];

  for (const f of files) {
    try {
      const res = await server.transformRequest(f);
      console.log('TRANSFORMED OK:', f);
    } catch (err) {
      console.error('TRANSFORM ERROR IN', f, ':', err);
    }
  }

  await server.close();
}

checkTransforms().catch(console.error);

