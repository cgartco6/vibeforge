import JSZip from 'jszip';

export async function generateProjectZIP(projectName: string, files: Record<string, string>) {
  const zip = new JSZip();

  // Add standard Next.js structure
  const structure = {
    'README.md': `# ${projectName}\n\nBuilt with VibeForge`,
    'package.json': JSON.stringify({
      name: projectName.toLowerCase().replace(/\s+/g, '-'),
      version: '0.1.0',
      scripts: { dev: 'next dev', build: 'next build' }
    }, null, 2),
    'next.config.mjs': `/** @type {import('next').NextConfig} */\nconst nextConfig = {};\nexport default nextConfig;`,
    'app/globals.css': `@tailwind base;\n@tailwind components;\n@tailwind utilities;`,
    'app/layout.tsx': files['layout.tsx'] || defaultLayout(),
    'app/page.tsx': files['page.tsx'] || defaultPage(projectName),
    'tailwind.config.ts': `import type { Config } from "tailwindcss";\nconst config: Config = { content: ["./app/**/*.{js,ts,jsx,tsx}"], theme: { extend: {} }, plugins: [] };\nexport default config;`,
  };

  Object.entries({ ...structure, ...files }).forEach(([path, content]) => {
    zip.file(path, content);
  });

  const blob = await zip.generateAsync({ type: 'blob' });
  return blob;
}

function defaultLayout() {
  return `import './globals.css';\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return <html><body>{children}</body></html>;\n}`;
}

function defaultPage(name: string) {
  return `export default function Home() {\n  return <div className="p-8"><h1 class="text-4xl">${name}</h1></div>;\n}`;
}
